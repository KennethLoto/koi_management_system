import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { LayoutList, PencilLine, Trash2 } from 'lucide-react';

interface Action {
    id: number;
    action: string;
}

interface ActionTableProps {
    actions: Action[];
    onEdit: (action: Action) => void;
    onDelete: (id: number) => void;
}

export default function ActionTable({ actions, onEdit, onDelete }: ActionTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {actions.length > 0 ? (
                    actions.map((action, i) => (
                        <TableRow key={action.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{action.action}</TableCell>
                            <TableCell className="flex gap-2">
                                <Link href={`actions/${action.id}`} title="Sub-Actions">
                                    <Button variant="secondary" className="transition-colors hover:bg-gray-700">
                                        <LayoutList />
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={() => onEdit(action)} title="Edit">
                                    <PencilLine />
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="transition-colors hover:bg-red-600"
                                    onClick={() => onDelete(action.id)}
                                    title="Delete"
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground pt-6 text-center">
                            No actions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
