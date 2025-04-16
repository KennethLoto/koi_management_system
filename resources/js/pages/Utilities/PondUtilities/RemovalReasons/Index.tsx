import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import RemovalReasonDialog from '@/components/CustomComponents/RemovalReason/RemovalReasonDialog';
import RemovalReasonTable from '@/components/CustomComponents/RemovalReason/RemovalReasonTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilities', href: '/utilities' },
    { title: 'Removal Reasons', href: '/removalReason' },
];

interface RemovalReason {
    id: number;
    removal_reason: string;
}

export default function Index({ removalReasons }: { removalReasons: RemovalReason[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteRemovalReasonId, setDeleteRemovalReasonId] = useState<number | null>(null);

    const handleDeleteClick = (removalReasonId: number) => {
        setDeleteRemovalReasonId(removalReasonId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteRemovalReasonId !== null) {
            router.delete(`removalReasons/${deleteRemovalReasonId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRemovalReason, setEditingRemovalReason] = useState<RemovalReason | null>(null);

    const handleEditClick = (removalReason: RemovalReason) => {
        setEditingRemovalReason(removalReason);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingRemovalReason(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Removal Reasons" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">Removal Reasons</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link" onClick={handleAddClick}>
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <RemovalReasonDialog
                                    editingRemovalReason={editingRemovalReason}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingRemovalReason(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <RemovalReasonTable removalReasons={removalReasons} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
