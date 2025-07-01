import React, { useState } from 'react';
import './DashboardData.scss';
import { BiChevronLeft, BiChevronRight, BiDotsVertical } from 'react-icons/bi';
import { dashboardData } from '../../constants/dashboardData';
import { DashboardDataItem } from '../../types/dashboardTypes';

const DashboardData: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(dashboardData.length / itemsPerPage);

  // Calculate the data to display for the current page
  const paginatedData = dashboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


   // Generate page numbers dynamically
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Show up to 5 page numbers at a time
    const pages: (number | string)[] = [];
    let startPage: number, endPage: number;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages to show a range around the current page
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and first/last pages if necessary
    if (startPage > 2) {
      pages.unshift('...');
      pages.unshift(1);
    } else if (startPage === 2) {
      pages.unshift(1);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
      pages.push(totalPages);
    } else if (endPage === totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };


  return (
    <div className="DashboardDataWrapper">
      <div className="dataContainer">
        <table className="dataTable">
          <thead>
            <tr>
              <th>
                ORGANIZATION <span>▼</span>
              </th>
              <th>
                USERNAME <span>▼</span>
              </th>
              <th>
                EMAIL <span>▼</span>
              </th>
              <th>
                PHONE NUMBER <span>▼</span>
              </th>
              <th>
                DATE JOINED <span>▼</span>
              </th>
              <th>
                STATUS <span>▼</span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: DashboardDataItem, index: number) => (
              <tr key={index}>
                <td>{item.organization}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.dateJoined}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {BiDotsVertical({ className: "tableIcon" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dataController">
        <div className='dropdownDiv'>
          <p>showing:</p>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            aria-label="Items per page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <p>out of {dashboardData.length}</p>
        </div>
        <div className='numberDisplay'>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {BiChevronLeft({})}
          </button>
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <p
                  key={index}
                  className={page === currentPage ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </p>
              ) : (
                <p key={index} className="ellipsis">
                  {page}
                </p>
              )
            )}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {BiChevronRight({})}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;