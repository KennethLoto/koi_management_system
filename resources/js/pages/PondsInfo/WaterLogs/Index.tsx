import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import WaterLogDialog from '@/components/CustomComponents/WaterLog/WaterLogDialog';
import WaterLogTable from '@/components/CustomComponents/WaterLog/WaterLogTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pond, WaterLog } from '../../../types/waterLogs';

export default function Logs({ pond, logs }: { pond: Pond; logs: WaterLog[] }) {
    useFlashMessage();

    const breadcrumbs = [
        { title: 'Ponds', href: '/ponds' },
        { title: `Pond ${pond.pond_id}`, href: `/ponds/${pond.id}` },
        { title: 'Water Logs', href: '#' },
    ];

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteWaterLogId, setDeleteWaterLogId] = useState<string | null>(null);

    const handleDeleteClick = (waterLogId: string) => {
        setDeleteWaterLogId(waterLogId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteWaterLogId) {
            router.delete(`/pondsInfo/waterLogs/${deleteWaterLogId}`);
        }
        setDeleteDialogOpen(false);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingWaterLog, setEditingWaterLog] = useState<WaterLog | null>(null);

    const handleEditClick = (log: WaterLog) => {
        setEditingWaterLog(log);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setEditingWaterLog(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Water Logs for Pond ${pond.pond_id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Water Logs</h2>
                            <p className="text-muted-foreground text-sm">
                                <span className="font-medium">Pond ID:</span> {pond.pond_id}
                            </p>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="link" onClick={handleAddClick}>
                                        Add Water Log
                                    </Button>
                                </DialogTrigger>
                                <WaterLogDialog
                                    pondId={pond.id}
                                    logs={logs}
                                    editingWaterLog={editingWaterLog}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingWaterLog(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <WaterLogTable logs={logs} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>
                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
