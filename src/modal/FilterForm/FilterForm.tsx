import React, { useEffect, useRef, useState } from 'react'
import { FilterFormProps } from '../../types/FilterFormTypes'
import { UserDataItem } from '../../types/userTypes'
import { format } from "date-fns"
import "./FilterForm.scss"
import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs';


const FilterForm: React.FC<FilterFormProps> = ({ isOpen, onClose, onFilter, users, currentFilters }) => {
    const [filters, setFilters] = useState<Partial<UserDataItem>>(currentFilters);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // update filters when currentFilters prop changes
    useEffect(() => {
        setFilters(currentFilters);
    },[currentFilters])

    // Handle click outside to close modal
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Close the modal
            setIsDatePickerOpen(false); // Close date picker if open
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);


    // Get unique organization for dropdown
    const organizations = Array.from(new Set(users.map((user) => user.organization)));

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof UserDataItem
    ) => {
        e.preventDefault();
        setFilters((prev) => ({...prev, [field]: e.target.value }))
        if (field === 'dateJoined') {
           setIsDatePickerOpen(false); 
        }
    }

    // Handle date selection
    const handleDateChange = (date: Dayjs | null, dateString: string | string[]) => {
        const formattedDate = date ? format(date.toDate(), 'yyyy-MM-dd') : '';
        setFilters((prev) => ({ ...prev, dateJoined: formattedDate }));
        setIsDatePickerOpen(false);
    };
    
    // handle reset 
    const handleReset = () => {
        setFilters({});
        onFilter({});
        setIsDatePickerOpen(false);
        onClose();
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        onFilter(filters);
        setIsDatePickerOpen(false);
    };
    

    if (!isOpen) return null;

  return (
    <div className="filterModal" ref={modalRef}>
        <form className="filterModalContent">
            <label htmlFor="organization">
                <p>organization</p>
                <select name="organization" id=""
                   onChange={(e) => handleInputChange(e, 'organization')}
                >
                    <option value="" >select</option>
                    {organizations.map((org) => (
                        <option key={org} value={org}>
                            {org}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor="username">
                <p>username</p>
                <input 
                   type="text" 
                   placeholder='user'
                   value={filters.username || ''}
                   onChange={(e) => handleInputChange(e, 'username')}
                />
            </label>
            <label htmlFor="email">
                <p>email</p>
                <input 
                   type="email" 
                   placeholder='email'
                   value={filters.email || ''}
                   onChange={(e) => handleInputChange(e, 'email')}
                />
            </label>
            <label htmlFor="date" className='dateSection'>
                <p>date</p>
                    <DatePicker
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                        value={filters.dateJoined ? dayjs(filters.dateJoined) : null}
                        onChange={handleDateChange}
                        format="MMM DD, YYYY"
                        className="dateClick"
                        suffixIcon={<img src={require('../../assets/calenderIcon.png')} alt="calendar" />}
                    />
            </label>
            <label htmlFor="phone number">
                <p>phone number</p>
                <input 
                   type="tel" 
                   placeholder='phone number'
                   value={filters.phoneNumber || ''}
                   onChange={(e) => handleInputChange(e, 'phoneNumber')}
                />
            </label>
            <label htmlFor="status">
                <p>status</p>
                <select value={filters.status || ''} onChange={(e) => handleInputChange(e, 'status')}>
                    {['Active', 'Inactive', 'Pending', 'Blacklisted'].map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </label>

            <div className='BTNs'>
                <button className="reset" onClick={handleReset}>
                    Reset
                </button>
                <button className="filter" onClick={handleSubmit}>
                    filter
                </button>
            </div>
        </form>
    </div>
  )
}

export default FilterForm