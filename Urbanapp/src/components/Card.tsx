import React, { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface CardProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
}

const Card = ({ title, children, isLoading = false }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;