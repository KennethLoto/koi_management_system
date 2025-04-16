import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserRole {
    id: number;
    user_role: string;
}

interface UserRoleTableProps {
    userRoles: UserRole[];
    onEdit: (user_role: UserRole) => void;
    onDelete: (id: number) => void;
}

export default function UserRoleTable({ userRoles, onEdit, onDelete }: UserRoleTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>User Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userRoles.length > 0 ? (
                    userRoles.map((userRole, i) => (
                        <TableRow key={userRole.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{userRole.user_role}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(userRole)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(userRole.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No roles found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
