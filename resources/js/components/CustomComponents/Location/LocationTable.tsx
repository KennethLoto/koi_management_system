import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Location {
    id: number;
    location: string;
}

interface LocationTableProps {
    locations: Location[];
    onEdit: (location: Location) => void;
    onDelete: (id: number) => void;
}

export default function LocationTable({ locations, onEdit, onDelete }: LocationTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Locations</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {locations.length > 0 ? (
                    locations.map((location, i) => (
                        <TableRow key={location.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{location.location}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(location)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(location.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No location found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
