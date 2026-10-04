import React from 'react';

interface ScalesLogoProps {
  className?: string;
  size?: number;
}

export const ScalesLogo: React.FC<ScalesLogoProps> = ({ className = 'text-[#C5A85C]', size = 26 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Pillar & Finial */}
      <path
        d="M16 3V27M16 3L14 5H18L16 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crossbeam */}
      <path
        d="M6 8.5C11 7 21 7 26 8.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Left Scale Strings & Pan */}
      <path
        d="M6 8.5L2.5 16M6 8.5L9.5 16"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M2 16C2 18.2 4.2 19.5 6 19.5C7.8 19.5 10 18.2 10 16H2Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Right Scale Strings & Pan */}
      <path
        d="M26 8.5L22.5 16M26 8.5L29.5 16"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M22 16C22 18.2 24.2 19.5 26 19.5C27.8 19.5 30 18.2 30 16H22Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Base Pedestal */}
      <path
        d="M11 27H21M9 29H23"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
};
