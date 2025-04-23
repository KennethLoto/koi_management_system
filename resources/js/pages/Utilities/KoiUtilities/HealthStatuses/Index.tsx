import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import HealthStatusDialog from '@/components/CustomComponents/HealthStatus/HealthStatusDialog';
import HealthStatusTable from '@/components/CustomComponents/HealthStatus/HealthStatusTable';
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
    { title: 'Koi Utilities', href: '/utilities/koiUtilities' },
    { title: 'Breeds', href: '/utilities/koiUtilities/breeds' },
];

interface HealthStatus {
    id: string;
    name: string;
}

export default function Index({ healthStatuses }: { healthStatuses: HealthStatus[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteHealthStatusId, setDeleteHealthStatusId] = useState<string | null>(null);

    const handleDeleteClick = (healthStatusId: string) => {
        setDeleteHealthStatusId(healthStatusId);
        setDeleteDialogOpen(true);
    };

    const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

    const handleDeleteConfirm = () => {
        if (deleteHealthStatusId) {
            setLoadingDeleteId(deleteHealthStatusId);
            router.delete(`healthStatuses/${deleteHealthStatusId}`, {
                onFinish: () => {
                    setLoadingDeleteId(null);
                    setDeleteDialogOpen(false);
                },
            });
        }
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingHealthStatus, setEditingHealthStatus] = useState<HealthStatus | null>(null);

    const handleEditClick = (healthStatus: HealthStatus) => {
        setEditingHealthStatus(healthStatus);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingHealthStatus(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Statuses" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Health Statuses</h2>
                                <p className="text-muted-foreground text-sm">▸ Manage your koi's health status.</p>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add Health Status
                                    </Button>
                                </DialogTrigger>
                                <HealthStatusDialog
                                    editingHealthStatus={editingHealthStatus}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingHealthStatus(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <HealthStatusTable
                                healthStatuses={healthStatuses}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                loadingDeleteId={loadingDeleteId}
                            />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
