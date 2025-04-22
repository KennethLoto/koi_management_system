import DeleteAlert from '@/components/CustomComponents/DeleteAlert';
import GenderDialog from '@/components/CustomComponents/Gender/GenderDialog';
import GenderTable from '@/components/CustomComponents/Gender/GenderTable';
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
    { title: 'Genders', href: '/utilities/koiUtilities/genders' },
];

interface Gender {
    id: string;
    name: string;
}

export default function Index({ genders }: { genders: Gender[] }) {
    // Flash message toast
    useFlashMessage();

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteGenderId, setDeleteGenderId] = useState<string | null>(null);

    const handleDeleteClick = (genderId: string) => {
        setDeleteGenderId(genderId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteGenderId !== null) {
            router.delete(`genders/${deleteGenderId}`);
        }
        setDeleteDialogOpen(false);
    };

    // Create/Edit dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingGender, setEditingGender] = useState<Gender | null>(null);

    const handleEditClick = (gender: Gender) => {
        setEditingGender(gender);
        setIsDialogOpen(true);
    };

    // Add dialog state
    const handleAddClick = () => {
        setEditingGender(null);
        setIsDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Genders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Genders</h2>
                                <p className="text-muted-foreground text-sm">▸ Manage your koi's gender classifications.</p>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleAddClick}>
                                        <PlusCircle />
                                        Add Gender
                                    </Button>
                                </DialogTrigger>
                                <GenderDialog
                                    editingGender={editingGender}
                                    onClose={() => {
                                        setIsDialogOpen(false);
                                        setEditingGender(null);
                                    }}
                                />
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <GenderTable genders={genders} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        </CardContent>
                    </Card>

                    <DeleteAlert open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
                </div>
            </div>
        </AppLayout>
    );
}
