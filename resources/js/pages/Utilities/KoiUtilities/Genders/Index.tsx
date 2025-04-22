import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import UserRoleDialog from '@/components/CustomComponents/UserRole/UserRoleDialog';
import UserRoleTable from '@/components/CustomComponents/UserRole/UserRoleTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilities', href: '/utilities' },
    { title: 'User Utilities', href: '/utilities/userUtilities' },
    { title: 'User Roles', href: '/userRoles' },
];

interface UserRole {
    id: number;
    user_role: string;
}

export default function Index({ userRoles }: { userRoles: UserRole[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserRoleId, setDeleteUserRoleId] = useState<number | null>(null);

    const handleDeleteClick = (userRoleId: number) => {
        setDeleteUserRoleId(userRoleId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteUserRoleId !== null) {
            router.delete(`userRoles/${deleteUserRoleId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUserRole, setEditingUserRole] = useState<UserRole | null>(null);

    const handleEditClick = (userRole: UserRole) => {
        setEditingUserRole(userRole);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingUserRole(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="UserRoles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">User Roles</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add User Role
                                    </Button>
                                </DialogTrigger>
                                <UserRoleDialog
                                    editingUserRole={editingUserRole}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingUserRole(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <UserRoleTable userRoles={userRoles} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
