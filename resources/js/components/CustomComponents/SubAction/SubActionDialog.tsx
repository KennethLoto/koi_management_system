import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateSubActionForm from '../../../pages/Utilities/PondUtilities/SubActions/Create';
import EditSubActionForm from '../../../pages/Utilities/PondUtilities/SubActions/Edit';

interface SubAction {
    id: number;
    sub_action: string;
    action_id: string;
}

interface Props {
    actionId: string;
    editingSubAction: SubAction | null;
    subActions: SubAction[];
    onClose: () => void;
}

export default function SubActionDialog({ actionId, editingSubAction, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingSubAction ? 'Edit' : 'Add'} Action</DialogTitle>
                <DialogDescription>
                    {editingSubAction
                        ? 'Update the sub action information below. Click update when you’re done.'
                        : 'Fill in the form to add a new sub action. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingSubAction ? (
                <EditSubActionForm subAction={editingSubAction} onSuccess={onClose} />
            ) : (
                <CreateSubActionForm actionId={actionId} onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
