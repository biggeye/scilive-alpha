import React from "react";

const PagButton = ({ active, disabled, children, ...rest }) => {
  return (
    <button
      className={`px-3 py-1 mx-1 rounded-md 
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-600 hover:text-white'} 
                  ${active ? 'bg-brand-600 text-white' : 'bg-white text-gray-700'} 
                  dark:bg-gray-800 text-sm`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container flex flex-row justify-center items-center my-4">
      <PagButton
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
      Left
      </PagButton>

      {pageNumbers.map(number => (
        <PagButton
          key={number}
          active={currentPage === number - 1}
          onClick={() => onPageChange(number - 1)}
        >
          {number}
        </PagButton>
      ))}

      <PagButton
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
   Right
      </PagButton>
    </div>
  );
}
