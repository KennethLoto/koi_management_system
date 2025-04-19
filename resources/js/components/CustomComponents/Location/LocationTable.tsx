import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';

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
        <div className="rounded-xl border p-4">
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
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(location)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(location.id)}>
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
                                No location found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
