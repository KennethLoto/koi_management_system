import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateHealthStatusForm from '../../../pages/Utilities/KoiUtilities/HealthStatuses/Create';
import EditHealthStatusForm from '../../../pages/Utilities/KoiUtilities/HealthStatuses/Edit';

interface HealthStatus {
    id: string;
    name: string;
}

interface Props {
    editingHealthStatus: HealthStatus | null;
    onClose: () => void;
}

export default function HealthStatysDialog({ editingHealthStatus, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingHealthStatus ? 'Edit' : 'Add'} Health Status</DialogTitle>
                <DialogDescription>
                    {editingHealthStatus
                        ? '▸ Update the health status details below and click "Update" when finished.'
                        : '▸ Fill in the form to add a new health status and click "Add" to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingHealthStatus ? (
                <EditHealthStatusForm healthStatus={editingHealthStatus} onSuccess={onClose} />
            ) : (
                <CreateHealthStatusForm onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
