import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, PencilLine, Trash2 } from 'lucide-react';

interface Gender {
    id: string;
    name: string;
}

interface GenderTableProps {
    genders: Gender[];
    onEdit: (gender: Gender) => void;
    onDelete: (id: string) => void;
    loadingDeleteId: string | null;
}

export default function GenderTable({ genders, onEdit, onDelete, loadingDeleteId }: GenderTableProps) {
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
                    {genders.length > 0 ? (
                        genders.map((gender, i) => (
                            <TableRow key={gender.id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{gender.name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(gender)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                onClick={() => onDelete(gender.id)}
                                                disabled={loadingDeleteId === gender.id}
                                            >
                                                {loadingDeleteId === gender.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
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
