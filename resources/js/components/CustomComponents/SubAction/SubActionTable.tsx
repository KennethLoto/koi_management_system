import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';

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
        <div className="rounded-xl border p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Sub-Actions</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subActions.length > 0 ? (
                        subActions.map((subAction, i) => (
                            <TableRow key={subAction.id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{subAction.sub_action}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(subAction)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(subAction.id)}>
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
                                No sub-actions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
