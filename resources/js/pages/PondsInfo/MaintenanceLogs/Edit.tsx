import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MaintenanceLog {
    id: string;
    action_id: string;
    sub_action_id: string;
    notes: string;
    pond_id: string;
}

interface EditMaintenanceLogFormProps {
    maintenanceLog: MaintenanceLog;
    actions: {
        id: string;
        action: string;
        sub_actions?: {
            id: string;
            sub_action: string;
        }[];
    }[];
    onSuccess: () => void;
}

export default function EditMaintenanceLogForm({ maintenanceLog, actions, onSuccess }: EditMaintenanceLogFormProps) {
    const [availableSubActions, setAvailableSubActions] = useState<{ id: string; sub_action: string }[]>([]);

    const { data, setData, put, processing, errors } = useForm({
        action_id: maintenanceLog.action_id || '',
        sub_action_id: maintenanceLog.sub_action_id || '',
        notes: maintenanceLog.notes || '',
        pond_id: maintenanceLog.pond_id,
    });

    useEffect(() => {
        if (data.action_id) {
            const selectedAction = actions.find((a) => a.id === data.action_id);
            setAvailableSubActions(selectedAction?.sub_actions ?? []);
        } else {
            setAvailableSubActions([]);
        }
    }, [data.action_id, actions]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pondsInfo/maintenanceLogs/${maintenanceLog.id}`, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                {/* Action Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="action_id" className="text-right">
                        Action
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Select value={data.action_id} onValueChange={(value) => setData('action_id', value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an action" />
                            </SelectTrigger>
                            <SelectContent>
                                {actions.map((action) => (
                                    <SelectItem key={action.id} value={action.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {action.action}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.action_id && <p className="text-sm text-red-500">{errors.action_id}</p>}
                    </div>
                </div>

                {/* Sub Action Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sub_action_id" className="text-right">
                        Sub Action
                    </Label>
                    <div className="col-span-3 space-y-1">
                        <Select
                            value={data.sub_action_id}
                            onValueChange={(value) => setData('sub_action_id', value)}
                            disabled={!data.action_id || availableSubActions.length === 0}
                            required
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
                        {errors.sub_action_id && <p className="text-sm text-red-500">{errors.sub_action_id}</p>}
                    </div>
                </div>

                {/* Notes */}
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
                            placeholder="Record any observations or details..."
                            rows={4}
                            className="max-h-40 min-h-[100px] resize-none overflow-y-auto"
                        />
                        {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
