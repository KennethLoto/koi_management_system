import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { WaterLog } from '../../../types/waterLogs';
// Import the WaterLog type

interface EditWaterLogFormProps {
    waterLog: WaterLog; // Use the imported WaterLog type
    onSuccess: () => void;
}

export default function EditWaterLogForm({ waterLog, onSuccess }: EditWaterLogFormProps) {
    const { data, setData, put, processing, errors } = useForm({
        ph_level: waterLog.ph_level,
        temperature: waterLog.temperature,
        ammonia_level: waterLog.ammonia_level,
        notes: waterLog.notes || '',
        pond_id: waterLog.pond_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pondsInfo/waterLogs/${waterLog.id}`, {
            onSuccess,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                {/* pH Level */}
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
                            onChange={(e) => setData('ph_level', parseFloat(e.target.value))}
                            required
                        />
                        {errors.ph_level && <p className="text-sm text-red-500">{errors.ph_level}</p>}
                    </div>
                </div>

                {/* Temperature */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="temperature" className="text-right">
                        Temperature (°C)
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="temperature"
                            type="number"
                            step="0.1"
                            value={data.temperature}
                            onChange={(e) => setData('temperature', parseFloat(e.target.value))}
                            required
                        />
                        {errors.temperature && <p className="text-sm text-red-500">{errors.temperature}</p>}
                    </div>
                </div>

                {/* Ammonia Level */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ammonia_level" className="text-right">
                        Ammonia Level (ppm)
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="ammonia_level"
                            type="number"
                            step="0.01"
                            value={data.ammonia_level}
                            onChange={(e) => setData('ammonia_level', parseFloat(e.target.value))}
                            required
                        />
                        {errors.ammonia_level && <p className="text-sm text-red-500">{errors.ammonia_level}</p>}
                    </div>
                </div>

                {/* Notes */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                        Notes
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Optional notes about the water conditions"
                        />
                        {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={processing} className="float-end">
                {processing ? (
                    <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                    </>
                ) : (
                    'Update Water Log'
                )}
            </Button>
        </form>
    );
}
