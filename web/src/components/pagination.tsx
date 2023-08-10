import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface IProps {
  handlePageChange: ({ selected }: {
    selected: any;
  }) => void;
  currentPage: number;
  totalPages: number;
  options: number[];
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({ currentPage, totalPages, handlePageChange, rowsPerPage, setRowsPerPage, options }: IProps) => {
  return (
    <div className="w-full flex justify-between items-center md:px-6 xl:px-8 px-4 pt-4 pb-2 bg-gray-50">
      <div>
        <p className="text-sm text-gray-600 font-medium capitalize">Showing {currentPage + 1} out of {totalPages} pages</p>
      </div>
      <div className='flex items-center space-x-3 text-sm'>
        <p>rows per page : </p>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className='border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
          {/* <option value={10} selected>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option> */}
          {
            options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          }
        </select>
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