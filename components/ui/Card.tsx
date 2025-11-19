import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className} dark:bg-gray-800 dark:shadow-2xl`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200 dark:text-gray-100 dark:border-gray-700">{title}</h3>}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;