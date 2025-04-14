import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import DeleteUserAlert from '@/components/User/DeleteUserAlert';
import UserDialog from '@/components/User/UserDialog';
import UserTable from '@/components/User/UserTable';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/user',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role?: {
        id: number;
        role: string;
    };
}

export default function Index({ users, userRoles }: { users: User[]; userRoles: any[] }) {
    useFlashMessage();

    // Delete Dialog State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

    const handleDeleteClick = (userId: number) => {
        setDeleteUserId(userId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteUserId) {
            router.delete(`/users/${deleteUserId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Add/Edit Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingUser(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">Users</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link" onClick={handleAddClick}>
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <UserDialog
                                    editingUser={editingUser}
                                    userRoles={userRoles}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingUser(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <UserTable users={users} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteUserAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
