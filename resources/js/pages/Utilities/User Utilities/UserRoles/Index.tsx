import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CreateUserForm from './Create';
import EditUserForm from './Edit';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilities',
        href: '/utilities',
    },

    {
        title: 'UserRoles',
        href: '/userRoles',
    },
];

interface UserRole {
    id: number;
    role: string;
}

interface Flash {
    success?: string;
    error?: string;
}

export default function Index({ userRoles }: { userRoles: UserRole[] }) {
    // Flash message toast
    const { flash } = usePage<{ flash: Flash }>().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);

    // Handel Delete Alert-Dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserRoleId, setDeleteUserRoleId] = useState<number | null>(null);

    const handleDeleteClick = (userRoleId: number) => {
        setDeleteUserRoleId(userRoleId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteCOnfirm = () => {
        router.delete(`userRoles/${deleteUserRoleId}`);
        setDeleteDialogOpen(false);
    };

    // Handle Edit and Create Dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserRole | null>(null);

    const handleEditClick = (user: UserRole) => {
        setEditingUser(user);
        setIsDialogOpen(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="UserRoles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">UserRoles</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link">Add</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingUser ? 'Edit' : 'Add'}</DialogTitle>
                                    </DialogHeader>
                                    {editingUser ? (
                                        <EditUserForm
                                            user={editingUser}
                                            onSuccess={() => {
                                                setIsDialogOpen(false);
                                            }}
                                        />
                                    ) : (
                                        <CreateUserForm onSuccess={() => setIsDialogOpen(false)} />
                                    )}
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userRoles.length > 0 ? (
                                        userRoles.map((userRole, id) => (
                                            <TableRow key={userRole.id}>
                                                <TableCell className="font-medium">{id + 1}</TableCell>
                                                <TableCell>{userRole.role}</TableCell>
                                                <TableCell>
                                                    <Button variant="link" onClick={() => handleEditClick(userRole)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="link" className="text-red-500" onClick={() => handleDeleteClick(userRole.id)}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                                                No roles found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteCOnfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AppLayout>
    );
}
