export interface WaterLog {
    id: string;
    ph_level: number;
    temperature: number;
    ammonia_level: number;
    notes: string | null;
    created_at: string;
    pond_id: string;
    user_id: string;
    user?: {
        id: string;
        name: string;
    };
}

export interface Pond {
    id: string;
    pond_id: string;
}
