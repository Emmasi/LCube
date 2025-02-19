import React from 'react';

interface HeroProps {
  heading: string;
  children?: React.ReactNode;
}

export default function Hero({ heading, children }: HeroProps) {
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center h-96 mb-20 text-center">
      <h1 className="text-xl md:text-4xl font-semibold">{heading}</h1>
      {children ? (
        <div className="mt-4">{children}</div>
      ) : (
        <p className="text-base md:text-base mt-4 text-[#FFB86C]">
          Ett företag som är inriktat på DevOps
        </p>
      )}
    </div>
  );
}
