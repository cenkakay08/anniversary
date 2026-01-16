import React, { memo, useState, useEffect, Fragment, useMemo } from "react";
import CountUp from "./CountUp";

const START_DATE = new Date(2025, 0, 23, 0, 0, 0, 0);

const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
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
));
TimeUnit.displayName = "TimeUnit";

const Divider = memo(() => (
  <div className="mb-6 hidden h-10 w-px self-center bg-linear-to-b from-transparent via-white/10 to-transparent lg:block" />
));
Divider.displayName = "Divider";

const TimeDisplay = () => {
  const [_, setRender] = useState(false);

  const duration = (() => {
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

    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  })();

  useEffect(() => {
    const interval = setInterval(() => setRender((prev) => !prev), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment key="time-display-content">
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
    </Fragment>
  );
};

export default memo(TimeDisplay);
