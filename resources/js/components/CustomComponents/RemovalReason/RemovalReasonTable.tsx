import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RemovalReason {
    id: number;
    removal_reason: string;
}

interface RemovalReasonTableProps {
    removalReasons: RemovalReason[];
    onEdit: (removal_reason: RemovalReason) => void;
    onDelete: (id: number) => void;
}

export default function RemovalReasonTable({ removalReasons, onEdit, onDelete }: RemovalReasonTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Removal Reasons</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {removalReasons.length > 0 ? (
                    removalReasons.map((removalReason, i) => (
                        <TableRow key={removalReason.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{removalReason.removal_reason}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(removalReason)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(removalReason.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No removal reasons found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
