import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditUserRoleForm({ userRole, onSuccess }: { userRole: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: userRole.id,
        user_role: userRole.user_role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/utilities/userUtilities/userRoles/${userRole.id}`, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="user_role" className="text-right">
                        User Role
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="user_role"
                            type="text"
                            autoFocus
                            value={data.user_role}
                            onChange={(e) => setData('user_role', e.target.value)}
                            autoComplete="on"
                            required
                            className="w-full"
                        />
                        {errors.user_role && <p className="text-sm text-red-500">{errors.user_role}</p>}
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={processing} className="float-end">
                {processing ? (
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Updating...
                    </>
                ) : (
                    'Update'
                )}
            </Button>
        </form>
    );
}
