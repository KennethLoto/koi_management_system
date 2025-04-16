import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateUserForm({ onSuccess }: { onSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/userRoles', {
            onSuccess: () => {
                reset();
                onSuccess(); // closes the modal
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
                            autoComplete="on"
                            value={data.user_role}
                            onChange={(e) => setData('user_role', e.target.value)}
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
                        Adding...
                    </>
                ) : (
                    'Add'
                )}
            </Button>
        </form>
    );
}
