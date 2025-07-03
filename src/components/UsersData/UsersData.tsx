import React, { useState, useEffect, useRef } from 'react';
import './UsersData.scss';
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronUp, BiDotsVertical, BiFilter, BiFilterAlt, BiUser, BiUserMinus } from 'react-icons/bi';
import { UserDataItem } from '../../types/userTypes';
import { FaRegEye } from 'react-icons/fa';
import FilterForm from '../../modal/FilterForm/FilterForm';
import debounce from '../../utils/debounce';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { UserDataContextType } from '../../types/UserDataTypes';


const UsersData: React.FC<UserDataContextType> = ({ users, loading, error, fetchUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); 
  const [filters, setFilters] = useState<Partial<UserDataItem>>({}); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const navigate = useNavigate();


  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isOutside = true;
      dropdownRefs.current.forEach((ref) => {
        if (ref && ref.contains(event.target as Node)) {
          isOutside = false;
        }
      });
      if (isOutside) setDropdownOpen(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search handler
  const handleSearch = debounce((value: string) => {
    setFilters((prev) => ({ ...prev, organization: value }));
    setCurrentPage(1); // Reset to first page
    setExpandedRows([]);
    setDropdownOpen(null);
  }, 500);

  // Handle input change for search
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const filteredUsers = users.filter((user) => 
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const userValue = user[key as keyof UserDataItem]
      
      if (typeof userValue === 'string' && typeof value === 'string') {
        return userValue.toLowerCase().includes(value.toLowerCase());
      }

      // If userValue is an object, skip or handle nested properties (optional)
      return false; 
    })
  )


  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleDropdown = (index: number) => {
    setDropdownOpen((prev) => {
      const newValue = prev === index ? null : index;
      return newValue;
    });
  };

  // Handle filter icon click
  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  // Handle filter application
  const handleApplyFilters = (newFilters: Partial<UserDataItem>) => {
    setFilters(newFilters);
    setCurrentPage(1); 
    setExpandedRows([]);
    setDropdownOpen(null);
  };



  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    let startPage: number, endPage: number;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
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

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

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
    setExpandedRows([]);
    setDropdownOpen(null);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
    setExpandedRows([]);
    setDropdownOpen(null);
  };

  // handleNavigation
  const handleRowClick = (user: UserDataItem) => {
    navigate(`/user-details/${user.id}`, { state: { user }})
  }

  const handleDropdownAction = (action: string, user: UserDataItem) => {
    console.log(`${action} clicked for user: ${user.username}`);
    setDropdownOpen(null);
  };

  if (loading) return (
    <div className="loadingContainer">
      <ClipLoader
        color="#333"
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  const renderDropdown = (item: UserDataItem, globalIndex: number) => {

  return (
    <div
      className="dropdownWrapper"
      ref={(el) => {
        if (el) dropdownRefs.current.set(globalIndex, el);
        else dropdownRefs.current.delete(globalIndex);
      }}
    >
      <p onClick={() => toggleDropdown(globalIndex)}>
        {BiDotsVertical({ className: "tableIcon"  })}
      </p>
      {dropdownOpen === globalIndex ? (
        <div className="dropdownMenu open">
          <div className='dropdownMenuContainer'>
            <div className="dropdownItem" onClick={() => handleDropdownAction('View', item)}>
               {FaRegEye({})} View Details
            </div>
            <div className="dropdownItem" onClick={() => handleDropdownAction('Blacklist', item)}>
              {BiUserMinus({})} Blacklist User
            </div>
            <div className="dropdownItem" onClick={() => handleDropdownAction('Activate', item)}>
               {BiUser({})} Activate User
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

  return (
    <div className="DashboardDataWrapper">
      <div className="dataContainer">
        <table className="dataTable">
          <thead>
            <tr>
              {['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status', ''].map((header, idx) => (
                <th key={idx}>
                  <span className="header-content">
                    {header}
                    {header && BiFilter({ size: 20, onClick: (e) => {
                      e.preventDefault();
                      handleFilterClick();
                    } })}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <div className='mobileHeaderDiv'>
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder='search organization'
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  aria-label="Search by organization"
                />
              </form>
              {BiFilterAlt({ className: "mobileFilterIcon", onClick: (e) => {
                e.preventDefault();
                handleFilterClick();
              } })}
            </div>
            {paginatedData.map((item, index) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + index;
              const isExpanded = expandedRows.includes(globalIndex);

              return (
                <tr 
                   key={item.id} className="dataRow"
                >
                  <td colSpan={7} className="mobileCell">
                    <div className="mobileCard">
                      <div className="mobileCardHeader" onClick={() => toggleRow(globalIndex)}>
                        <div className="mobileCardMain">
                          <span className="mobileCardTitle hoverLink"
                           onClick={() => handleRowClick(item)}
                          >
                            {item.username}
                          </span>
                          <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                        </div>
                        {isExpanded ? BiChevronUp({ className: "toggleIcon" }) : BiChevronDown({ className: "toggleIcon" })}
                      </div>
                      <div className={`mobileCardContent ${isExpanded ? 'expanded' : ''}`}>
                        <div className="mobileCardDetails">
                          {[
                            { label: 'Organization', value: item.organization },
                            { label: 'Email', value: item.email },
                            { label: 'Phone', value: item.phoneNumber },
                            { label: 'Date Joined', value: item.dateJoined },
                            { label: 'Actions', value: renderDropdown(item, globalIndex) },
                          ].map((detail, idx) => (
                            <div key={idx} className="detailItem">
                              <span className="detailLabel">{detail.label}:</span>
                              {typeof detail.value === 'string' ? (
                                <span className="detailValue">{detail.value}</span>
                              ) : (
                                detail.value
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* desktop function */}
                    <div className="desktopRow">
                      <div>{item.organization}</div>
                      <div className="hoverLink" onClick={() => handleRowClick(item)}>
                        {item.username}
                      </div>
                      <div className='email'>{item.email}</div>
                      <div>{item.phoneNumber}</div>
                      <div>{item.dateJoined}</div>
                      <div className='dotIcon'>
                        <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                      </div>
                      {renderDropdown(item, globalIndex)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Add filter form */}
      <FilterForm
         isOpen={isFilterModalOpen}
         onClose={() => setIsFilterModalOpen(false)}
         onFilter={handleApplyFilters}
         users={users}
         currentFilters={filters}
      />
      {/* filter form end */}
      <div className="dataController">
        <div className="dropdownDiv">
          <p>Showing:</p>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            aria-label="Items per page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[9, 18, 36, 50, 100, 200, 300, 400, 500].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <p>out of {filteredUsers.length}</p>
        </div>
        <div className="numberDisplay">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
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
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            {BiChevronRight({})}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersData;