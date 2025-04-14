import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateUserForm({ onSuccess, userRoles }: { onSuccess: () => void; userRoles: { id: number; role: string }[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users', {
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
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                        Role
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <select
                            id="role"
                            value={data.role_id}
                            onChange={(e) => setData('role_id', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm"
                            required
                        >
                            <option value="" disabled hidden selected>
                                Select a role
                            </option>
                            {userRoles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role}
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
                        Adding...
                    </>
                ) : (
                    'Add'
                )}
            </Button>
        </form>
    );
}
