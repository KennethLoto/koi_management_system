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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

interface Flash {
    success: string;
    error: string;
}

export default function Index({ users, userRoles }: { users: User[]; userRoles: any[] }) {
    // Handle Flash Messages
    const { flash } = usePage<{ flash: Flash }>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Handle Delete Alert-Dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

    const handleDeleteClick = (userId: number) => {
        setDeleteUserId(userId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        router.delete(`/users/${deleteUserId}`);
        setDeleteDialogOpen(false);
    };

    // Handle Edit and Create Dialog
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
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingUser ? 'Edit' : 'Add'} User</DialogTitle>
                                        <DialogDescription>
                                            {editingUser
                                                ? 'Update the user information below. Click update when you’re done.'
                                                : 'Fill in the form to add a new user. Click add to proceed.'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    {editingUser ? (
                                        <EditUserForm
                                            user={editingUser}
                                            userRoles={userRoles}
                                            onSuccess={() => {
                                                setIsDialogOpen(false);
                                                setEditingUser(null);
                                            }}
                                        />
                                    ) : (
                                        <CreateUserForm userRoles={userRoles} onSuccess={() => setIsDialogOpen(false)} />
                                    )}
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user, id) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{id + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role?.role}</TableCell>
                                            <TableCell>
                                                <Button variant="link" onClick={() => handleEditClick(user)}>
                                                    Edit
                                                </Button>
                                                <Button variant="link" className="text-red-500" onClick={() => handleDeleteClick(user.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AppLayout>
    );
}
