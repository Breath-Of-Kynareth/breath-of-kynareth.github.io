export interface ExistingRaid{
    channelID: string;
    data: {
        raid: string;
        date: string;
        leader: string;
        dps: Record<string, string>;
        healers: Record<string, string>;
        tanks: Record<string, string>;
        backup_dps: Record<string, string>;
        backup_healers: Record<string, string>;
        backup_tanks: Record<string, string>;
        dps_limit: number;
        healer_limit: number;
        tank_limit: number;
        role_limit: number;
        memo: string;
    }
}

export interface NewRaid{
    raid: string;
    date: string;
    leader: string;
    dps_limit: number;
    healer_limit: number;
    tank_limit: number;
    role_limit: number;
    memo: string;    
}