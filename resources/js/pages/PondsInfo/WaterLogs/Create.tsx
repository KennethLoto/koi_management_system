import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateWaterLogForm({ pondId, onSuccess }: { pondId: string; onSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ph_level: '',
        temperature: '',
        ammonia_level: '',
        notes: '',
        pond_id: pondId,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pondsInfo/waterLogs', {
            onSuccess: () => {
                reset();
                onSuccess();
            },
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
                            onChange={(e) => setData('ph_level', e.target.value)}
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
                            onChange={(e) => setData('temperature', e.target.value)}
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
                            onChange={(e) => setData('ammonia_level', e.target.value)}
                            required
                        />
                        {errors.ammonia_level && <p className="text-sm text-red-500">{errors.ammonia_level}</p>}
                    </div>
                </div>

                {/* Notes Section with Border */}
                <div className="mt-4 border-t pt-6">
                    <div className="grid grid-cols-4 items-start gap-4">
                        <div className="space-y-1 text-right">
                            <Label htmlFor="notes">Notes</Label>
                            <span className="text-muted-foreground block text-xs">Optional</span>
                        </div>
                        <div className="col-span-3 space-y-2">
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Record any observations."
                                rows={4}
                                className="max-h-40 min-h-[100px] resize-none overflow-y-auto"
                            />
                            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={processing} className="float-end">
                {processing ? (
                    <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                    </>
                ) : (
                    'Add'
                )}
            </Button>
        </form>
    );
}
