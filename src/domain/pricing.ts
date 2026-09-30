import { Clock } from "./clock.ts";

export interface Climber {
    student: boolean;
}

const FULL_PRICE = 1200;
const STUDENT_PRICE = 900;
const OFF_PEAK_DISCOUNT = 300;
const PEAK_HOUR = 17;

export function priceOf(climber: Climber, at: Date): number {
    const basic = climber.student? STUDENT_PRICE : FULL_PRICE;
    return at.getUTCHours() < PEAK_HOUR ? basic - OFF_PEAK_DISCOUNT : basic;
}