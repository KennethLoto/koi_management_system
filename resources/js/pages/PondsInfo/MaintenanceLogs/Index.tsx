import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import MaintenanceLogDialog from '@/components/CustomComponents/MaintenanceLog/MaintenanceLogDialog';
import MaintenanceLogTable from '@/components/CustomComponents/MaintenanceLog/MaintenanceLogTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { MaintenanceLog, Pond } from '../../../types/maintenanceLogs';

interface IndexProps {
    pond: Pond;
    maintenanceLogs: MaintenanceLog[];
    actions: {
        id: string;
        action: string;
        sub_actions?: {
            id: string;
            sub_action: string;
        }[];
    }[];
}

export default function Index({ pond, maintenanceLogs, actions }: IndexProps) {
    useFlashMessage();

    const breadcrumbs = [
        { title: 'Ponds', href: '/ponds' },
        { title: `Pond ${pond.pond_id}`, href: `/ponds/${pond.id}` },
        { title: 'Maintenance Logs', href: '#' },
    ];

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteMaintenanceLogId, setDeleteMaintenanceLogId] = useState<string | null>(null);

    const handleDeleteClick = (maintenanceLogId: string) => {
        setDeleteMaintenanceLogId(maintenanceLogId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteMaintenanceLogId) {
            router.delete(`/pondsInfo/maintenanceLogs/${deleteMaintenanceLogId}`);
        }
        setDeleteDialogOpen(false);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMaintenanceLog, setEditingMaintenanceLog] = useState<MaintenanceLog | null>(null);

    const handleEditClick = (maintenanceLog: MaintenanceLog) => {
        setEditingMaintenanceLog(maintenanceLog);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingMaintenanceLog(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Maintenance Logs for Pond ${pond.pond_id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Maintenance Logs</h2>
                                <p className="text-muted-foreground text-sm">
                                    <span className="font-medium">Pond ID:</span> {pond.pond_id}
                                </p>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Log
                                    </Button>
                                </DialogTrigger>
                                <MaintenanceLogDialog
                                    pondId={pond.id}
                                    editingMaintenanceLog={editingMaintenanceLog}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingMaintenanceLog(null);
                                    }}
                                    actions={actions}
                                    maintenanceLogs={maintenanceLogs}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <MaintenanceLogTable maintenanceLogs={maintenanceLogs} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>
                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
