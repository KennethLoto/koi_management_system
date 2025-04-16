import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateRemovalReasonForm from '../../../pages/Utilities/PondUtilities/RemovalReasons/Create';
import EditRemovalReasonForm from '../../../pages/Utilities/PondUtilities/RemovalReasons/Edit';

interface RemovalReason {
    id: number;
    removal_reason: string;
}

interface Props {
    editingRemovalReason: RemovalReason | null;
    onClose: () => void;
}

export default function RemovalReasonDialog({ editingRemovalReason, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingRemovalReason ? 'Edit' : 'Add'} User Role</DialogTitle>
                <DialogDescription>
                    {editingRemovalReason
                        ? 'Update the user role information below. Click update when you’re done.'
                        : 'Fill in the form to add a new user role. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingRemovalReason ? (
                <EditRemovalReasonForm removalReason={editingRemovalReason} onSuccess={onClose} />
            ) : (
                <CreateRemovalReasonForm onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
