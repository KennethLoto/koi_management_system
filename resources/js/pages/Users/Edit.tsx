import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditUserForm({ user, onSuccess }: { user: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
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
                    <Label htmlFor="Name" className="text-right">
                        Name
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Password" className="text-right">
                        Password
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Email" className="text-right">
                        Email
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Role" className="text-right">
                        Role
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="role"
                            type="text"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
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
