import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateActionForm from '../../../pages/Utilities/PondUtilities/Actions/Create';
import EditActionForm from '../../../pages/Utilities/PondUtilities/Actions/Edit';

interface Action {
    id: number;
    action: string;
}

interface Props {
    editingAction: Action | null;
    onClose: () => void;
}

export default function UserRoleDialog({ editingAction, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingAction ? 'Edit' : 'Add'} Action</DialogTitle>
                <DialogDescription>
                    {editingAction
                        ? 'Update the action information below. Click update when you’re done.'
                        : 'Fill in the form to add a new action. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingAction ? <EditActionForm action={editingAction} onSuccess={onClose} /> : <CreateActionForm onSuccess={onClose} />}
        </DialogContent>
    );
}
