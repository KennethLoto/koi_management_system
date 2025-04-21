import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateMaintenanceLogForm from '../../../pages/PondsInfo/MaintenanceLogs/Create';
import EditMaintenanceLogForm from '../../../pages/PondsInfo/MaintenanceLogs/Edit';
import { MaintenanceLog } from '../../../types/maintenanceLogs';

interface Props {
    pondId: string;
    maintenanceLogs: MaintenanceLog[];
    editingMaintenanceLog: MaintenanceLog | null;
    onClose: () => void;
    actions: {
        id: string;
        action: string;
        sub_actions?: {
            id: string;
            sub_action: string;
        }[];
    }[];
}

export default function MaintenanceLogDialog({ pondId, editingMaintenanceLog, onClose, actions }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingMaintenanceLog ? 'Edit Water Log' : 'Add Water Log'}</DialogTitle>
                <DialogDescription>
                    {editingMaintenanceLog
                        ? 'Update the water log information below. Click update when you’re done.'
                        : 'Fill in the form to add a new water log. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>

            {editingMaintenanceLog ? (
                <EditMaintenanceLogForm actions={actions} maintenanceLog={editingMaintenanceLog} onSuccess={onClose} />
            ) : (
                <CreateMaintenanceLogForm pondId={pondId} onSuccess={onClose} actions={actions} />
            )}
        </DialogContent>
    );
}
