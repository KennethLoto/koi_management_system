import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateUserForm from '../../../pages/Users/Create';
import EditUserForm from '../../../pages/Users/Edit';

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

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
                        ? 'Update the user information below. Click update when you’re done.'
                        : 'Fill in the form to add a new user. Click add to proceed.'}
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
