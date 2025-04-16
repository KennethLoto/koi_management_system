import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateLocationForm from '../../../pages/Utilities/PondUtilities/Locations/Create';
import EditLocationForm from '../../../pages/Utilities/PondUtilities/Locations/Edit';

interface Location {
    id: number;
    location: string;
}

interface Props {
    editingLocation: Location | null;
    onClose: () => void;
}

export default function LocationDialog({ editingLocation, onClose }: Props) {
    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>{editingLocation ? 'Edit' : 'Add'} Location</DialogTitle>
                <DialogDescription>
                    {editingLocation
                        ? 'Update the location information below. Click update when you’re done.'
                        : 'Fill in the form to add a location role. Click add to proceed.'}
                </DialogDescription>
            </DialogHeader>
            {editingLocation ? <EditLocationForm location={editingLocation} onSuccess={onClose} /> : <CreateLocationForm onSuccess={onClose} />}
        </DialogContent>
    );
}
