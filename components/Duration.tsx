'use client';

import { useEffect, useState, memo } from 'react';
import CountUp from './CountUp';

const START_DATE = new Date(2025, 0, 23, 0, 0, 0, 0);

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center min-w-[70px] md:min-w-[100px]">
        <CountUp
            to={value}
            duration={0.5}
            className="text-4xl md:text-6xl font-black bg-linear-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-md font-sans"
        />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 mt-2 group-hover:text-white/60 transition-colors">{label}</span>
    </div>
);

const Divider = () => (
    <div className="h-10 w-px bg-linear-to-b from-transparent via-white/10 to-transparent self-center mb-6 hidden lg:block" />
);

const Duration = memo(() => {
    const [duration, setDuration] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const updateDuration = () => {
            const now = new Date();
            const diffMs = now.getTime() - START_DATE.getTime();

            // Zaman birimlerini milisaniye cinsinden tanımla (Nominal değerler)
            const secondMs = 1000;
            const minuteMs = secondMs * 60;
            const hourMs = minuteMs * 60;
            const dayMs = hourMs * 24;
            const yearMs = dayMs * 365;      // Testin tam çıkması için 365 gün
            const monthMs = yearMs / 12;     // Bir yılın tam 12'de biri

            // Her birimi hiyerarşik olarak hesapla
            const years = Math.floor(diffMs / yearMs);
            const months = Math.floor((diffMs % yearMs) / monthMs);
            const days = Math.floor((diffMs % monthMs) / dayMs);
            const hours = Math.floor((diffMs % dayMs) / hourMs);
            const minutes = Math.floor((diffMs % hourMs) / minuteMs);
            const seconds = Math.floor((diffMs % minuteMs) / secondMs);

            setDuration({ years, months, days, hours, minutes, seconds });
        };

        updateDuration();
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex shrink-0 flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-xl md:text-3xl font-medium tracking-[0.2em] text-white/60 uppercase">
                    Together For...
                </h2>
                <div className="h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 p-6 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:bg-white/10 hover:border-white/20 group">
                <TimeUnit value={duration.years} label="Years" />
                <Divider />
                <TimeUnit value={duration.months} label="Months" />
                <Divider />
                <TimeUnit value={duration.days} label="Days" />
                <Divider />
                <TimeUnit value={duration.hours} label="Hours" />
                <Divider />
                <TimeUnit value={duration.minutes} label="Minutes" />
                <Divider />
                <TimeUnit value={duration.seconds} label="Seconds" />
            </div>
        </div>
    );
});

Duration.displayName = 'Duration';

export default Duration;
