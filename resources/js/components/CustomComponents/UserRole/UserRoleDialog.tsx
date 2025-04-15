import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import CreateUserForm from '../../../pages/Utilities/UserUtilities/UserRoles/Create';
import EditUserForm from '../../../pages/Utilities/UserUtilities/UserRoles/Edit';

interface UserRole {
    id: number;
    role: string;
}

interface Props {
    editingUserRole: UserRole | null;
    onClose: () => void;
}

export default function UserRoleDialog({ editingUserRole, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingUserRole ? 'Edit' : 'Add'} User Role</DialogTitle>
                <DialogDescription>
                    {editingUserRole
                        ? 'Update the user role information below. Click update when you’re done.'
                        : 'Fill in the form to add a new user role. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingUserRole ? <EditUserForm user={editingUserRole} onSuccess={onClose} /> : <CreateUserForm onSuccess={onClose} />}
        </DialogContent>
    );
}
