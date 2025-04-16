import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditUserForm({ user, userRoles, onSuccess }: { user: any; userRoles: any[]; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
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
                        <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full"
                        />
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
                            autoComplete="new-password"
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
                            autoComplete="email"
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
                        <select
                            id="role"
                            value={data.role_id}
                            onChange={(e) => setData('role_id', e.target.value)}
                            required
                            className="text-blackdark:border-gray-600 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                        >
                            <option value="" disabled hidden selected>
                                Select Role
                            </option>
                            {userRoles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.user_role}
                                </option>
                            ))}
                        </select>
                        {errors.role_id && <p className="text-sm text-red-500">{errors.role_id}</p>}
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
