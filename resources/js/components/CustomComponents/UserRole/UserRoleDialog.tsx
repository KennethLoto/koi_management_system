import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateUserRoleForm from '../../../pages/Utilities/UserUtilities/UserRoles/Create';
import EditUserRoleForm from '../../../pages/Utilities/UserUtilities/UserRoles/Edit';

interface UserRole {
    id: number;
    user_role: string;
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
            {editingUserRole ? <EditUserRoleForm userRole={editingUserRole} onSuccess={onClose} /> : <CreateUserRoleForm onSuccess={onClose} />}
        </DialogContent>
    );
}
