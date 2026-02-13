import React from "react";

interface ProgressBarProps {
  value: number;
  color?: string;
  trackColor?: string;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "#8b5cf6",
  trackColor = "#f3f4f6",
  height = "h-2",
}) => {
  return (
    <div
      className={`w-full ${height} rounded-full overflow-hidden`}
      style={{ backgroundColor: trackColor }}
    >
      <div
        className={`${height} rounded-full transition-all duration-500 ease-out`}
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default ProgressBar;
