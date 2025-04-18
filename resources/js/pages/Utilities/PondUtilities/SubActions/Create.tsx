import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function CreateSubActionForm({ actionId, onSuccess }: { actionId: string; onSuccess: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        sub_action: '',
        action_id: actionId,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/utilities/pondUtilities/subActions', {
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
                    <Label htmlFor="sub_action" className="text-right">
                        Sub Action
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="sub_action"
                            type="text"
                            autoComplete="on"
                            value={data.sub_action}
                            onChange={(e) => setData('sub_action', e.target.value)}
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
                        Adding...
                    </>
                ) : (
                    'Add'
                )}
            </Button>
        </form>
    );
}
