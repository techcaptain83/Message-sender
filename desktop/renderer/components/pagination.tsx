import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface IProps {
  handlePageChange: ({ selected }: {
    selected: any;
  }) => void;
  currentPage: number;
  totalPages: number;
}
const Pagination = ({ currentPage, totalPages, handlePageChange }: IProps) => {
  return (
    <div className="w-full flex justify-between md:px-6 xl:px-8 px-4 pt-4 bg-gray-50">
      <div>
        <p className="text-sm text-gray-600 font-medium capitalize">Showing {currentPage + 1} out of {totalPages} pages</p>
      </div>
      <div className="flex space-x-2 text-white">
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange({ selected: currentPage - 1 })}
          className={`bg-blue-500 py-1 px-2 rounded-md shadow ${currentPage === 0 && 'bg-blue-300/80 cursor-not-allowed'}`}>
          <BsArrowLeft size={20} />
        </button>
        <button
          onClick={() => handlePageChange({ selected: currentPage + 1 })}
          className={`bg-blue-500 py-1 px-2 rounded-md shadow ${currentPage + 1 === totalPages && 'bg-blue-300/80 cursor-not-allowed'}`}>
          <BsArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default Pagination