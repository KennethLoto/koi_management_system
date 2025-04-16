import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role?: {
        id: number;
        role: string;
    };
}

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length > 0 ? (
                    users.map((user, i) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role?.role || 'No role'}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(user)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(user.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-muted-foreground pt-6 text-center">
                            No users found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
