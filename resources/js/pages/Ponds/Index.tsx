import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import PondDialog from '@/components/CustomComponents/Pond/PondDialog';
import PondTable from '@/components/CustomComponents/Pond/PondTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useFlashMessage from '@/hooks/useFlashMessage';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [{ title: 'Pond Management', href: '/ponds' }];

interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location_id: number;
    location?: {
        id: number;
        location: string;
    };
}

export default function Index({ ponds, locations }: { ponds: Pond[]; locations: any[] }) {
    useFlashMessage();

    // Delete Dialog State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePondId, setDeletePondId] = useState<number | null>(null);

    const handleDeleteClick = (pondId: number) => {
        setDeletePondId(pondId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deletePondId) {
            router.delete(`/ponds/${deletePondId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Add/Edit Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPond, setEditingPond] = useState<Pond | null>(null);

    const handleEditClick = (pond: Pond) => {
        setEditingPond(pond);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingPond(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ponds" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Ponds</h2>
                                <p className="text-muted-foreground text-sm">▸ Manage pond details, and associated water/maintenance logs.</p>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add Pond
                                    </Button>
                                </DialogTrigger>
                                <PondDialog
                                    editingPond={editingPond}
                                    locations={locations}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingPond(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <PondTable ponds={ponds} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
