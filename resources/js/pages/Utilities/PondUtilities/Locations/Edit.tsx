import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditLocationForm({ location, onSuccess }: { location: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: location.id,
        location: location.location,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/utilities/pondUtilities/locations/${location.id}`, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                        Locations
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="location"
                            type="text"
                            autoFocus
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            autoComplete="on"
                            required
                            className="w-full"
                        />
                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
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
