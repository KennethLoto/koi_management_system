import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';

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
        <div className="rounded-xl border p-4">
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
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(userRole)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(userRole.id)}>
                                                <Trash2 />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete</TooltipContent>
                                    </Tooltip>
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
        </div>
    );
}
