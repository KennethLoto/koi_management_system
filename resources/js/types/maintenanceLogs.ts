export interface MaintenanceLog {
    id: string;
    action_id: string;
    sub_action_id: string;
    notes: string;
    pond_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        name: string;
    };
    pond?: {
        id: string;
        pond_id: string;
    };
    action?: {
        id: string;
        action: string;
        sub_actions?: {
            id: string;
            sub_action: string;
        }[];
    };
    sub_action?: {
        id: string;
        sub_action: string;
    };
}

export interface Pond {
    id: string;
    pond_id: string;
}
