import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function EditSubActionForm({ subAction, onSuccess }: { subAction: any; onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: subAction.id,
        sub_action: subAction.sub_action,
        action_id: subAction.action_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting data:', data); // 👈 Logs the form data
        put(`/utilities/pondUtilities/subActions/${subAction.id}`, {
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
                    <Label htmlFor="sub_action" className="text-right">
                        Sub Action
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="sub_action"
                            type="text"
                            autoFocus
                            value={data.sub_action}
                            onChange={(e) => setData('sub_action', e.target.value)}
                            autoComplete="on"
                            required
                            className="w-full"
                        />
                        {errors.sub_action && <p className="text-sm text-red-500">{errors.sub_action}</p>}
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
