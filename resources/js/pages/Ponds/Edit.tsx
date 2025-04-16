import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditPondForm({ pond, locations, onSuccess }: { pond: any; locations: any[]; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: pond.id,
        capacity: pond.capacity,
        location_id: pond.location_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/ponds/${pond.id}`, {
            onSuccess: () => {
                reset();
                onSuccess(); // closes the modal
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                        Capacity
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="capacity"
                            autoFocus
                            type="number"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.capacity && <p className="text-sm text-red-500">{errors.capacity}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location_id" className="text-right">
                        Location
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <select
                            id="location_id"
                            value={data.location_id}
                            onChange={(e) => setData('location_id', e.target.value)}
                            className="text-blackdark:border-gray-600 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                            required
                        >
                            <option value="" disabled hidden selected>
                                Select a location
                            </option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.location}
                                </option>
                            ))}
                        </select>
                        {errors.location_id && <p className="text-sm text-red-500">{errors.location_id}</p>}
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={processing} className="float-end">
                {processing ? (
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Updating...
                    </>
                ) : (
                    'Update'
                )}
            </Button>
        </form>
    );
}
