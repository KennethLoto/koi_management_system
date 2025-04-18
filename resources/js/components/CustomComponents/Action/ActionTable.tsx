import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';

interface Action {
    id: number;
    action: string;
}

interface ActionTableProps {
    actions: Action[];
    onEdit: (action: Action) => void;
    onDelete: (id: number) => void;
}

export default function ActionTable({ actions, onEdit, onDelete }: ActionTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {actions.length > 0 ? (
                    actions.map((action, i) => (
                        <TableRow key={action.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{action.action}</TableCell>
                            <TableCell>
                                <Link href={`actions/${action.id}`}>
                                    <Button variant="link">Sub-Actions</Button>
                                </Link>
                                <Button variant="link" onClick={() => onEdit(action)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(action.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No actions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
