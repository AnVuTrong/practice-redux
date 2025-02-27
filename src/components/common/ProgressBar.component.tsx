import React from 'react';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  label?: string;
  showPercentage?: boolean;
  height?: string;
  width?: string;
  bgColor?: string;
  fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue = 100,
  label,
  showPercentage = true,
  height = 'h-2',
  width = 'w-24',
  bgColor = 'bg-secondary',
  fillColor = 'bg-primary'
}) => {
  const percentage = Math.min(Math.max(0, (value / maxValue) * 100), 100);

  return (
    <div className='flex items-center'>
      {label && <span className='text-sm text-text-secondary mr-2'>{label}</span>}
      <div className={`${height} ${width} ${bgColor} rounded-full overflow-hidden`}>
        <div className={`h-full ${fillColor}`} style={{ width: `${percentage}%` }} />
      </div>
      {showPercentage && <span className='ml-2 text-sm font-medium'>{Math.round(percentage)}%</span>}
    </div>
  );
};
