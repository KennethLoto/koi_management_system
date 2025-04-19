import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SubAction {
    id: number;
    sub_action: string;
    action_id: string;
}

interface SubActionTableProps {
    subActions: SubAction[];
    onEdit: (subAction: SubAction) => void;
    onDelete: (id: number) => void;
}

export default function SubActionTable({ subActions = [], onEdit, onDelete }: SubActionTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Sub-Action</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subActions.length > 0 ? (
                    subActions.map((subAction, i) => (
                        <TableRow key={subAction.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{subAction.sub_action}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(subAction)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(subAction.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No sub-actions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
