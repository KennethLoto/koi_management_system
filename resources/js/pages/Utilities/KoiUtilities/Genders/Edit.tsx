import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditGenderForm({ gender, onSuccess }: { gender: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: gender.id,
        name: gender.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/utilities/koiUtilities/genders/${gender.id}`, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="space-y-6">
                    {/* Gender Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Gender</Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="on"
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
                            Updating...
                        </>
                    ) : (
                        'Update'
                    )}
                </Button>
            </div>
        </form>
    );
}
