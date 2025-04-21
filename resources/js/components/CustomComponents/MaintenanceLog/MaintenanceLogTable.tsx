import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';
import { MaintenanceLog } from '../../../types/maintenanceLogs';

interface MaintenanceLogTableProps {
    maintenanceLogs: MaintenanceLog[];
    onEdit: (maintenanceLog: MaintenanceLog) => void;
    onDelete: (maintenanceLogId: string) => void;
}

export default function MaintenanceLogTable({ maintenanceLogs, onEdit, onDelete }: MaintenanceLogTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Sub-Actions</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {maintenanceLogs.length > 0 ? (
                    maintenanceLogs.map((maintenanceLog, i) => (
                        <TableRow key={maintenanceLog.id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{maintenanceLog.action?.action}</TableCell>
                            <TableCell>{maintenanceLog.sub_action?.sub_action}</TableCell>
                            <TableCell className="max-w-[300px] text-justify break-words whitespace-pre-wrap">
                                {maintenanceLog.notes ?? '—'}
                            </TableCell>
                            <TableCell>{maintenanceLog.user?.name ?? 'N/A'}</TableCell>
                            <TableCell className="font-medium">
                                {new Date(maintenanceLog.created_at)
                                    .toLocaleString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true,
                                    })
                                    .replace(' at', ' @')
                                    .replace('AM', 'am')
                                    .replace('PM', 'pm')}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" onClick={() => onEdit(maintenanceLog)}>
                                            <PencilLine />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent> Edit </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="destructive" onClick={() => onDelete(maintenanceLog.id)}>
                                            <Trash2 />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent> Delete </TooltipContent>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                            No maintenance logs available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
