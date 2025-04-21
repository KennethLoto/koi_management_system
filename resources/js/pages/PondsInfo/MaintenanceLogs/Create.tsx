import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreateMaintenanceLogFormProps {
    pondId: string;
    onSuccess: () => void;
    actions: {
        id: string;
        action: string;
        sub_actions?: {
            id: string;
            sub_action: string;
        }[];
    }[];
}

export default function CreateMaintenanceLogForm({ pondId, onSuccess, actions }: CreateMaintenanceLogFormProps) {
    const [availableSubActions, setAvailableSubActions] = useState<{ id: string; sub_action: string }[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        action_id: '',
        sub_action_id: '',
        notes: '',
        pond_id: pondId,
    });

    useEffect(() => {
        if (data.action_id) {
            const selectedAction = actions.find((a) => a.id === data.action_id);
            setAvailableSubActions(selectedAction?.sub_actions ?? []);
            if (!selectedAction?.sub_actions?.some((sub) => sub.id === data.sub_action_id)) {
                setData('sub_action_id', '');
            }
        } else {
            setAvailableSubActions([]);
            setData('sub_action_id', '');
        }
    }, [data.action_id, actions]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pondsInfo/maintenanceLogs', {
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
                    {/* Action Dropdown */}
                    <div className="space-y-2">
                        <Label htmlFor="action_id">Action</Label>
                        <Select value={data.action_id} onValueChange={(value) => setData('action_id', value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an action" />
                            </SelectTrigger>
                            <SelectContent>
                                {actions?.map((action) => (
                                    <SelectItem key={action.id} value={action.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {action.action}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.action_id && <p className="text-destructive text-sm">{errors.action_id}</p>}
                    </div>

                    {/* Sub Action Dropdown */}
                    <div className="space-y-2">
                        <Label htmlFor="sub_action_id">Sub Action</Label>
                        <Select
                            value={data.sub_action_id}
                            onValueChange={(value) => setData('sub_action_id', value)}
                            disabled={!data.action_id || availableSubActions.length === 0}
                            required={availableSubActions.length > 0}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        !data.action_id
                                            ? 'Select an action first'
                                            : availableSubActions.length === 0
                                              ? 'No sub-actions available'
                                              : 'Select a sub-action'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSubActions.map((subAction) => (
                                    <SelectItem key={subAction.id} value={subAction.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {subAction.sub_action}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.sub_action_id && <p className="text-destructive text-sm">{errors.sub_action_id}</p>}
                    </div>

                    {/* Notes Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notes">Notes</Label>
                            <span className="text-muted-foreground text-sm">Optional</span>
                        </div>
                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Record any observations."
                            className="min-h-[120px]"
                        />
                        {errors.notes && <p className="text-destructive text-sm">{errors.notes}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
