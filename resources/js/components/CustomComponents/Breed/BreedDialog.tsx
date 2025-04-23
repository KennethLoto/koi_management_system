import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateBreedForm from '../../../pages/Utilities/KoiUtilities/Breeds/Create';
import EditBreedForm from '../../../pages/Utilities/KoiUtilities/Breeds/Edit';

interface Breed {
    id: string;
    name: string;
}

interface Props {
    editingBreed: Breed | null;
    onClose: () => void;
}

export default function BreedDialog({ editingBreed, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingBreed ? 'Edit' : 'Add'} Breed</DialogTitle>
                <DialogDescription>
                    {editingBreed
                        ? '▸ Update the breed details below and click "Update" when finished.'
                        : '▸ Fill in the form to add a new breed and click "Add" to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingBreed ? <EditBreedForm breed={editingBreed} onSuccess={onClose} /> : <CreateBreedForm onSuccess={onClose} />}
        </DialogContent>
    );
}
