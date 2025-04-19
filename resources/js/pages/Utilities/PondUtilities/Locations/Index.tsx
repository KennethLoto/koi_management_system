import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import LocationDialog from '@/components/CustomComponents/Location/LocationDialog';
import UserRoleTable from '@/components/CustomComponents/Location/LocationTable';
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
    { title: 'Pond Utilities', href: '/utilities/pondUtilities' },
    { title: 'Locations', href: '/locations' },
];

interface Location {
    id: number;
    location: string;
}

export default function Index({ locations }: { locations: Location[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteLocationId, setDeleteLocationId] = useState<number | null>(null);

    const handleDeleteClick = (locationId: number) => {
        setDeleteLocationId(locationId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteLocationId !== null) {
            router.delete(`locations/${deleteLocationId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(null);

    const handleEditClick = (location: Location) => {
        setEditingLocation(location);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingLocation(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Locations" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <h2 className="text-lg font-bold">Locations</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add Location
                                    </Button>
                                </DialogTrigger>
                                <LocationDialog
                                    editingLocation={editingLocation}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingLocation(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <UserRoleTable locations={locations} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
