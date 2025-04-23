import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, PencilLine, Trash2 } from 'lucide-react';

interface Breed {
    id: string;
    name: string;
}

interface BreedTableProps {
    breeds: Breed[];
    onEdit: (breed: Breed) => void;
    onDelete: (id: string) => void;
    loadingDeleteId: string | null;
}

export default function BreedTable({ breeds, onEdit, onDelete, loadingDeleteId }: BreedTableProps) {
    return (
        <div className="rounded-xl border p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {breeds.length > 0 ? (
                        breeds.map((breed, i) => (
                            <TableRow key={breed.id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{breed.name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(breed)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(breed.id)} disabled={loadingDeleteId === breed.id}>
                                                {loadingDeleteId === breed.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
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
                                No breeds found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
