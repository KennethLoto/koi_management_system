import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateLocationForm({ onSuccess }: { onSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        location: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/locations', {
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
                    <Label htmlFor="location" className="text-right">
                        Location
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="location"
                            type="text"
                            autoComplete="on"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
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
                        Adding...
                    </>
                ) : (
                    'Add'
                )}
            </Button>
        </form>
    );
}
