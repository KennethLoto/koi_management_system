import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditPondForm({ pond, locations, onSuccess }: { pond: any; locations: any[]; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: pond.id,
        capacity: pond.capacity,
        ph_level: pond.ph_level,
        temperature: pond.temperature,
        ammonia_level: pond.ammonia_level,
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
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm"
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

                {/* Improved Water Parameters Section */}
                <div className="space-y-4 pt-2">
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-md leading-6 font-medium text-gray-900">
                            Water Parameters
                            <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Provide water quality measurements for better monitoring</p>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ph_level" className="text-right">
                            pH Level
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="ph_level"
                                type="number"
                                step="0.1"
                                value={data.ph_level}
                                onChange={(e) => setData('ph_level', e.target.value)}
                                className="w-full"
                            />
                            {errors.ph_level && <p className="text-sm text-red-500">{errors.ph_level}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="temperature" className="text-right">
                            Temperature (°C)
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="temperature"
                                type="number"
                                value={data.temperature}
                                onChange={(e) => setData('temperature', e.target.value)}
                                className="w-full"
                            />
                            {errors.temperature && <p className="text-sm text-red-500">{errors.temperature}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ammonia_level" className="text-right">
                            Ammonia Level
                        </Label>
                        <div className="col-span-3 space-y-1">
                            <Input
                                id="ammonia_level"
                                type="number"
                                step="0.01"
                                value={data.ammonia_level}
                                onChange={(e) => setData('ammonia_level', e.target.value)}
                                className="w-full"
                            />
                            {errors.ammonia_level && <p className="text-sm text-red-500">{errors.ammonia_level}</p>}
                        </div>
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
