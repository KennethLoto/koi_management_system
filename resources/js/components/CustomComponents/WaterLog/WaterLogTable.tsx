import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaterLog } from '../../../types/waterLogs';

interface WaterLogTableProps {
    logs: WaterLog[];
    onEdit: (log: WaterLog) => void;
    onDelete: (waterLogId: string) => void;
}

export default function WaterLogTable({ logs, onEdit, onDelete }: WaterLogTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>pH</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Ammonia</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Recorder By</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.length > 0 ? (
                    logs.map((log, i) => (
                        <TableRow key={log.id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="font-medium">{new Date(log.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{log.ph_level}</TableCell>
                            <TableCell>{log.temperature}</TableCell>
                            <TableCell>{log.ammonia_level}</TableCell>
                            <TableCell>{log.notes ?? '—'}</TableCell>
                            <TableCell>{log.user?.name ?? 'N/A'}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => onEdit(log)}>
                                    Edit
                                </Button>
                                <Button variant="link" className="text-red-500" onClick={() => onDelete(log.id)}>
                                    Delete
                                </Button>
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
    );
}
