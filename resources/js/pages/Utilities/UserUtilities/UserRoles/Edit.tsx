import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditUserForm({ user, onSuccess }: { user: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        role: user.role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/userRoles/${user.id}`, {
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
                    <Label htmlFor="Role" className="text-right">
                        Role
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="role"
                            type="text"
                            autoFocus
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            autoComplete="on"
                            required
                            className="w-full"
                        />
                        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
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
