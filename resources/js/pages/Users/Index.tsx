import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import UserDialog from '@/components/CustomComponents/User/UserDialog';
import UserTable from '@/components/CustomComponents/User/UserTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types/users';
import { Head, router } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [{ title: 'User Management', href: '/users' }];

export default function Index({ users, userRoles }: { users: User[]; userRoles: any[] }) {
    useFlashMessage();

    // Delete Dialog State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

    const handleDeleteClick = (userId: number) => {
        setDeleteUserId(userId);
        setDeleteDialogOpen(true);
    };

    const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);

    const handleDeleteConfirm = () => {
        if (deleteUserId) {
            setLoadingDeleteId(deleteUserId);
            router.delete(`/users/${deleteUserId}`, {
                onFinish: () => {
                    setLoadingDeleteId(null);
                    setDeleteDialogOpen(false);
                },
            });
        }
    };

    // Add/Edit Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setIsDialogOpen(true);
    };

    // Add dialog state
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
                        <CardHeader className="flex flex-col items-start gap-2">
                            <div className="flex w-full items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold">Users </h2>
                                    <p className="text-muted-foreground text-sm">
                                        ▸ Manage all user accounts with access to your koi farming operations and data.
                                    </p>
                                </div>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={handleAddClick}>
                                            <UserPlus />
                                            Add User
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
                            </div>
                        </CardHeader>
                        <CardContent>
                            <UserTable users={users} onEdit={handleEditClick} onDelete={handleDeleteClick} loadingDeleteId={loadingDeleteId} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
