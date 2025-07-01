import React, { useState } from 'react';
import './DashboardData.scss';
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronUp, BiDotsVertical, BiFilter } from 'react-icons/bi';
import { dashboardData } from '../../constants/dashboardData';
import { DashboardDataItem } from '../../types/dashboardTypes';

const DashboardData: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Calculate total pages
  const totalPages = Math.ceil(dashboardData.length / itemsPerPage);

  // Calculate the data to display for the current page
  const paginatedData = dashboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle collapse/expand for a row
  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

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
    setExpandedRows([])
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
    setExpandedRows([])
  };


  return (
    <div className="DashboardDataWrapper">
      <div className="dataContainer">
        <table className="dataTable">
          <thead>
            <tr>
              <th>
                <span className="header-content">
                  ORGANIZATION
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th>
                <span className="header-content">
                  USERNAME
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th>
                <span className="header-content">
                  EMAIL
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th>
                <span className="header-content">
                  PHONE NUMBER
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th>
                <span className="header-content">
                  DATE JOINED
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th>
                <span className="header-content">
                  STATUS
                  {BiFilter({ size: 20 })}
                </span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: DashboardDataItem, index: number) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + index;
              const isExpanded = expandedRows.includes(globalIndex);

              return (
                <tr key={globalIndex} className="dataRow">
                  <td colSpan={7} className="mobileCell">
                    <div className="mobileCard">
                      <div
                        className="mobileCardHeader"
                        onClick={() => toggleRow(globalIndex)}
                      >
                        <div className="mobileCardMain">
                          <span className="mobileCardTitle">{item.organization}</span>
                          <span className={`status ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </div>
                        {isExpanded ? (
                          BiChevronUp({ className: "toggleIcon" })
                        ) : (
                          BiChevronDown({ className: "toggleIcon" })
                        )}
                      </div>
                      <div
                        className={`mobileCardContent ${isExpanded ? 'expanded' : ''}`}
                      >
                        <div className="mobileCardDetails">
                          <div className="detailItem">
                            <span className="detailLabel">Username:</span>
                            <span>{item.username}</span>
                          </div>
                          <div className="detailItem">
                            <span className="detailLabel">Email:</span>
                            <span>{item.email}</span>
                          </div>
                          <div className="detailItem">
                            <span className="detailLabel">Phone:</span>
                            <span>{item.phoneNumber}</span>
                          </div>
                          <div className="detailItem">
                            <span className="detailLabel">Date Joined:</span>
                            <span>{item.dateJoined}</span>
                          </div>
                          <div className="detailItem">
                            {BiDotsVertical({ className: "tableIcon" })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop/Tablet table cells */}
                    <div className="desktopRow">
                      <div>{item.organization}</div>
                      <div>{item.username}</div>
                      <div>{item.email}</div>
                      <div>{item.phoneNumber}</div>
                      <div>{item.dateJoined}</div>
                      <div>
                        <span className={`status ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </div>
                      <div>
                        {BiDotsVertical({ className: "tableIcon" })}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
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