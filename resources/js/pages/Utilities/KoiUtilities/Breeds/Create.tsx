import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateBreedForm({ onSuccess }: { onSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/utilities/koiUtilities/breeds', {
            onSuccess: () => {
                reset();
                onSuccess(); // closes the modal
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="space-y-6">
                    {/* Breed Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Breed</Label>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="on"
                            placeholder="e.g. Kohaku"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="w-full"
                        />
                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="animate-spin" />
                            Adding...
                        </>
                    ) : (
                        'Add'
                    )}
                </Button>
            </div>
        </form>
    );
}
