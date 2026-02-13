import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "p-6",
}) => {
  return (
    <div
      className={`bg-white rounded-[20px] border border-gray-100/60 ${padding} ${className}`}
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
    >
      {children}
    </div>
  );
};

export default Card;
