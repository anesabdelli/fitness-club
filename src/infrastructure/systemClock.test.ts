import { systemClock } from "./systemClock.ts";

test("the system clock gives the current time", () => {
    const directTime = Date.now();
    const ourTime = systemClock.now().getTime();
    
    expect(ourTime).toBeGreaterThanOrEqual(directTime);
    expect(ourTime).toBeLessThanOrEqual(Date.now());
})