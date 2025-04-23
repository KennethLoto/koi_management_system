import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2, PencilLine, Trash2 } from 'lucide-react';

interface HealthStatus {
    id: string;
    name: string;
}

interface HealthStatusTableProps {
    healthStatuses: HealthStatus[];
    onEdit: (healthStatus: HealthStatus) => void;
    onDelete: (id: string) => void;
    loadingDeleteId: string | null;
}

export default function HealthStatusTable({ healthStatuses, onEdit, onDelete, loadingDeleteId }: HealthStatusTableProps) {
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
                    {healthStatuses.length > 0 ? (
                        healthStatuses.map((healthStatus, i) => (
                            <TableRow key={healthStatus.id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{healthStatus.name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => onEdit(healthStatus)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                onClick={() => onDelete(healthStatus.id)}
                                                disabled={loadingDeleteId === healthStatus.id}
                                            >
                                                {loadingDeleteId === healthStatus.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
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
                                No health status found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
