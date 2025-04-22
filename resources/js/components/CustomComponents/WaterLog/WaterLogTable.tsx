import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PencilLine, Trash2 } from 'lucide-react';
import { WaterLog } from '../../../types/waterLogs';

interface WaterLogTableProps {
    waterLogs: WaterLog[];
    onEdit: (waterLog: WaterLog) => void;
    onDelete: (waterLogId: string) => void;
}

export default function WaterLogTable({ waterLogs, onEdit, onDelete }: WaterLogTableProps) {
    return (
        <div className="rounded-xl border p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>pH Level</TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Ammonia Level</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Added By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {waterLogs.length > 0 ? (
                        waterLogs.map((waterLog, i) => (
                            <TableRow key={waterLog.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{waterLog.ph_level}</TableCell>
                                <TableCell>{waterLog.temperature}</TableCell>
                                <TableCell>{waterLog.ammonia_level}</TableCell>
                                <TableCell className="max-w-[300px] text-justify break-words whitespace-pre-wrap">{waterLog.notes ?? '—'}</TableCell>
                                <TableCell>{waterLog.user?.name ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">
                                    {new Date(waterLog.created_at)
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
                                            <Button variant="secondary" onClick={() => onEdit(waterLog)}>
                                                <PencilLine />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="destructive" onClick={() => onDelete(waterLog.id)}>
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
                            <TableCell colSpan={8} className="h-24 text-center">
                                No water logs available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
