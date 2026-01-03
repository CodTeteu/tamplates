import { useState, useEffect, useCallback } from "react";
import type { CountdownTime } from "@/types";

/**
 * Custom hook for countdown timer functionality
 * Calculates and updates time remaining until a target date
 */
const useCountdown = (targetDate: Date): CountdownTime => {
    const calculateTimeLeft = useCallback((): CountdownTime => {
        const difference = +targetDate - +new Date();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return timeLeft;
};

export default useCountdown;
