import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Eye, PencilLine, Trash2 } from 'lucide-react';

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
        <div className="rounded-xl border p-4">
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
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href={`/ponds/${pond.id}`}>
                                                <Button variant="secondary">
                                                    <Eye />
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>View</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(pond)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(pond.id)}>
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
                            <TableCell colSpan={5} className="text-muted-foreground pt-6 text-center">
                                No ponds found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
