import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateGenderForm from '../../../pages/Utilities/KoiUtilities/Genders/Create';
import EditGenderForm from '../../../pages/Utilities/KoiUtilities/Genders/Edit';

interface Gender {
    id: string;
    name: string;
}

interface Props {
    editingGender: Gender | null;
    onClose: () => void;
}

export default function GenderDialog({ editingGender, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingGender ? 'Edit' : 'Add'} Gender</DialogTitle>
                <DialogDescription>
                    {editingGender
                        ? '▸ Update the gender details below and click "Update" when finished.'
                        : '▸ Fill in the form to add a new gender and click "Add" to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingGender ? <EditGenderForm gender={editingGender} onSuccess={onClose} /> : <CreateGenderForm onSuccess={onClose} />}
        </DialogContent>
    );
}
