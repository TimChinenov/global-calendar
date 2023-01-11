import { MomentZone } from "moment-timezone";

export interface Meeting {
    timezone: MomentZone | null,
    lengthMinutes: number,
}