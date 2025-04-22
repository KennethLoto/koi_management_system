import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '@/types/users';
import CreateUserForm from '../../../pages/Users/Create';
import EditUserForm from '../../../pages/Users/Edit';

interface Props {
    editingUser: User | null;
    userRoles: any[];
    onClose: () => void;
}

export default function UserDialog({ editingUser, userRoles, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingUser ? 'Edit' : 'Add'} User</DialogTitle>
                <DialogDescription>
                    {editingUser
                        ? '▸ Update the user details below and click "Update" when finished.'
                        : '▸ Fill in the form to add a new user and click "Add" to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingUser ? (
                <EditUserForm user={editingUser} userRoles={userRoles} onSuccess={onClose} />
            ) : (
                <CreateUserForm userRoles={userRoles} onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
