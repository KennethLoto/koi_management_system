import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';

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
        <div className="rounded-xl border p-4">
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
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(removalReason)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(removalReason.id)}>
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
                                No removal reasons found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
