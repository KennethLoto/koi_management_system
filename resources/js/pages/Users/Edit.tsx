import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function EditUserForm({ user, userRoles, onSuccess }: { user: any; userRoles: any[]; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        password: user.password,
    });

    const [showPassword, setShowPassword] = useState(false);

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
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            placeholder="e.g., Juan Dela Cruz"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            placeholder="e.g., test@example.com"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="text-muted-foreground h-4 w-4" />
                                ) : (
                                    <Eye className="text-muted-foreground h-4 w-4" />
                                )}
                                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                            </Button>
                        </div>
                        {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                    </div>

                    {/* Role Select */}
                    <div className="space-y-2">
                        <Label htmlFor="role_id">Role</Label>
                        <Select value={data.role_id} onValueChange={(value) => setData('role_id', value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select user role" />
                            </SelectTrigger>
                            <SelectContent>
                                {userRoles.map((role) => (
                                    <SelectItem key={role.id} value={role.id.toString()} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {role.user_role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role_id && <p className="text-destructive text-sm">{errors.role_id}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Update User'
                    )}
                </Button>
            </div>
        </form>
    );
}
