export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    user_role?: {
        id: number;
        user_role: string;
    };
}
