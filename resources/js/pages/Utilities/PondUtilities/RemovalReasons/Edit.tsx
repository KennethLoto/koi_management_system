import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditRemovalReasonForm({ removalReason, onSuccess }: { removalReason: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: removalReason.id,
        removal_reason: removalReason.removal_reason,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/utilities/pondUtilities/removalReasons/${removalReason.id}`, {
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
                    <Label htmlFor="removal_reason" className="text-right">
                        Removal Reason
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="removal_reason"
                            type="text"
                            autoFocus
                            value={data.removal_reason}
                            onChange={(e) => setData('removal_reason', e.target.value)}
                            autoComplete="on"
                            required
                            className="w-full"
                        />
                        {errors.removal_reason && <p className="text-sm text-red-500">{errors.removal_reason}</p>}
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
