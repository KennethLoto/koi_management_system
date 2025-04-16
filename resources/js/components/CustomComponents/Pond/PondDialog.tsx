import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreatePondForm from '../../../pages/Ponds/Create';
import EditPondForm from '../../../pages/Ponds/Edit';

interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location_id: number;
    location?: {
        id: number;
        location: string;
    };
}

interface Props {
    editingPond: Pond | null;
    locations: any[];
    onClose: () => void;
}

export default function PondDialog({ editingPond, locations, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingPond ? 'Edit' : 'Add'} Pond</DialogTitle>
                <DialogDescription>
                    {editingPond
                        ? 'Update the pond information below. Click update when you’re done.'
                        : 'Fill in the form to add a new pond. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingPond ? (
                <EditPondForm pond={editingPond} locations={locations} onSuccess={onClose} />
            ) : (
                <CreatePondForm locations={locations} onSuccess={onClose} />
            )}
        </DialogContent>
    );
}
