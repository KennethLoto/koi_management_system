import ActionDialog from '@/components/CustomComponents/Action/ActionDialog';
import ActionTable from '@/components/CustomComponents/Action/ActionTable';
import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
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
    { title: 'Pond Utilities', href: '/utilities' },
    { title: 'Actions', href: '/utilities/pondUtilities/actions' },
];

interface Action {
    id: number;
    action: string;
}

export default function Index({ actions }: { actions: Action[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteActionId, setDeleteActionId] = useState<number | null>(null);

    const handleDeleteClick = (actionId: number) => {
        setDeleteActionId(actionId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteActionId !== null) {
            router.delete(`actions/${deleteActionId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAction, setEditingAction] = useState<Action | null>(null);

    const handleEditClick = (action: Action) => {
        setEditingAction(action);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingAction(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Actions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">Actions</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link" onClick={handleAddClick}>
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <ActionDialog
                                    editingAction={editingAction}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingAction(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <ActionTable actions={actions} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
