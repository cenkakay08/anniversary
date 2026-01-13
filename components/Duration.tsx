"use client";

import { useEffect, useState, memo } from "react";
import CountUp from "./CountUp";

const START_DATE = new Date(2025, 0, 23, 0, 0, 0, 0);

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex min-w-[70px] flex-col items-center md:min-w-[100px]">
    <CountUp
      to={value}
      duration={0.5}
      className="bg-linear-to-b from-white via-white/90 to-white/40 bg-clip-text font-sans text-4xl font-black text-transparent drop-shadow-md md:text-6xl"
    />
    <span className="mt-2 text-[10px] font-bold tracking-widest text-white/40 uppercase transition-colors group-hover:text-white/60 md:text-xs">
      {label}
    </span>
  </div>
);

const Divider = () => (
  <div className="mb-6 hidden h-10 w-px self-center bg-linear-to-b from-transparent via-white/10 to-transparent lg:block" />
);

const Duration = memo(() => {
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
      const yearMs = dayMs * 365; // Testin tam çıkması için 365 gün
      const monthMs = yearMs / 12; // Bir yılın tam 12'de biri

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
    <div className="flex shrink-0 flex-col items-center gap-4 px-4 md:gap-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white/60 uppercase md:text-3xl">
          Together For...
        </h2>
        <div className="h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="group flex flex-wrap items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-1 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10 sm:p-6 md:gap-8 md:p-10">
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

Duration.displayName = "Duration";

export default Duration;
