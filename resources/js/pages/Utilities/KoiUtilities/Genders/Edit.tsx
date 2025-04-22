import { Button } from '@/components/ui/button';
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Gender
                    </Label>
                    <div className="col-span-3 space-y-1">
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
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
