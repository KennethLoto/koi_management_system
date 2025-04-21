import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateWaterLogForm from '../../../pages/PondsInfo/WaterLogs/Create';
import EditWaterLogForm from '../../../pages/PondsInfo/WaterLogs/Edit';
import { WaterLog } from '../../../types/waterLogs';

interface Props {
    pondId: string;
    waterLogs: WaterLog[];
    editingWaterLog: WaterLog | null;
    onClose: () => void;
}

export default function WaterLogDialog({ pondId, editingWaterLog, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingWaterLog ? 'Edit Water Log' : 'Add Water Log'}</DialogTitle>
                <DialogDescription>
                    {editingWaterLog
                        ? 'Update the water log information below. Click update when you’re done.'
                        : 'Fill in the form to add a new water log. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>

            {editingWaterLog ? (
                <EditWaterLogForm waterLog={editingWaterLog} onSuccess={onClose} />
            ) : (
                <CreateWaterLogForm pondId={pondId} onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
