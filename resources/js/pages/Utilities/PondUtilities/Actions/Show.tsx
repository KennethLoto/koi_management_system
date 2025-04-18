import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import SubActionDialog from '@/components/CustomComponents/SubAction/SubActionDialog';
import SubActionTable from '@/components/CustomComponents/SubAction/SubActionTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface SubAction {
    id: number;
    sub_action: string;
    action_id: string;
}

interface Action {
    id: string;
    action: string;
    sub_actions: SubAction[];
}

export default function Show({ subAction }: { subAction: Action }) {
    const breadcrumbs = [
        { title: 'Actions', href: '/utilities/pondUtilities/actions' },
        { title: `Action - ${subAction.action}`, href: `/actions/${subAction.id}` },
    ];

    useFlashMessage();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteSubActionId, setDeleteSubActionId] = useState<number | null>(null);

    const handleDeleteClick = (subActionId: number) => {
        setDeleteSubActionId(subActionId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteSubActionId) {
            router.delete(`/utilities/pondUtilities/subActions/${deleteSubActionId}`);
        }
        setDeleteDialogOpen(false);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSubAction, setEditingSubAction] = useState<SubAction | null>(null);

    const handleEditClick = (subAction: SubAction) => {
        setEditingSubAction(subAction);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingSubAction(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Action Details" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto space-y-4 p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">Sub Actions</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link" onClick={handleAddClick}>
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <SubActionDialog
                                    actionId={subAction.id}
                                    editingSubAction={editingSubAction}
                                    subActions={subAction.sub_actions}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingSubAction(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <SubActionTable subActions={subAction.sub_actions} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>
                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
