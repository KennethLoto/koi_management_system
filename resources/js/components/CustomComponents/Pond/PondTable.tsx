import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';

interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location_id: number;
    location?: {
        id: number;
        location: string;
    };
}

interface PondTableProps {
    ponds: Pond[];
    onEdit: (pond: Pond) => void;
    onDelete: (pondId: number) => void;
}

export default function PondTable({ ponds, onEdit, onDelete }: PondTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Pond ID</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ponds.length > 0 ? (
                    ponds.map((pond, i) => (
                        <TableRow key={pond.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{pond.pond_id}</TableCell>
                            <TableCell>{pond.capacity}</TableCell>
                            <TableCell>{pond.location?.location || 'No Location'}</TableCell>
                            <TableCell>
                                <Link href={`/ponds/${pond.id}`}>
                                    <Button variant="link">View</Button>
                                </Link>
                                <Button variant="link" onClick={() => onEdit(pond)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(pond.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-muted-foreground pt-6 text-center">
                            No ponds found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
