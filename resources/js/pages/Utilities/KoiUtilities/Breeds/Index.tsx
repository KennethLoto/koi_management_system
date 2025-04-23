import BreedDialog from '@/components/CustomComponents/Breed/BreedDialog';
import BreedTable from '@/components/CustomComponents/Breed/BreedTable';
import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
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

interface Breed {
    id: string;
    name: string;
}

export default function Index({ breeds }: { breeds: Breed[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteBreedId, setDeleteBreedId] = useState<string | null>(null);

    const handleDeleteClick = (breedId: string) => {
        setDeleteBreedId(breedId);
        setDeleteDialogOpen(true);
    };

    const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

    const handleDeleteConfirm = () => {
        if (deleteBreedId) {
            setLoadingDeleteId(deleteBreedId);
            router.delete(`breeds/${deleteBreedId}`, {
                onFinish: () => {
                    setLoadingDeleteId(null);
                    setDeleteDialogOpen(false);
                },
            });
        }
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBreed, setEditingBreed] = useState<Breed | null>(null);

    const handleEditClick = (breed: Breed) => {
        setEditingBreed(breed);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingBreed(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Breeds" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Breeds</h2>
                                <p className="text-muted-foreground text-sm">▸ Manage your koi's breeds.</p>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add Breed
                                    </Button>
                                </DialogTrigger>
                                <BreedDialog
                                    editingBreed={editingBreed}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingBreed(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <BreedTable breeds={breeds} onEdit={handleEditClick} onDelete={handleDeleteClick} loadingDeleteId={loadingDeleteId} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
