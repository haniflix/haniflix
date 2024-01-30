import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetGenresQuery } from '../store/rtk-query/genresApi';
import { addClassNames } from '../store/utils/functions';

import { MdOutlineArrowDropDown } from "react-icons/md";

function GenresDropdown() {
    const { data: genresData, isLoading, error } = useGetGenresQuery();
    const [isOpen, setIsOpen] = useState(true);

    const dropdownContentRef = useRef(null);
    const dropdownButtonRef = useRef(null);

    const genres = genresData?.genres

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('event ', event)
            if (
                event.target !== dropdownButtonRef.current &&
                !dropdownContentRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);



    return (
        <div className="relative w-[fit-content] bg-[black] ml-3 sm:ml-[50px] mb-1">
            <button
                ref={dropdownButtonRef}
                className={
                    addClassNames(
                        'relative border h-[40px] flex items-center justify-center',
                        'border-[grey] px-3 gap-1'
                    )
                }
                onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Genres
                </div>
                <div><MdOutlineArrowDropDown className='text-white' /></div>
            </button>
            <div
                ref={dropdownContentRef}
                className='relative'>
                {isOpen && (
                    <ul className={
                        addClassNames(
                            "absolute grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3",
                            'bg-black w-[52vw] sm:w-[270px] md:w-[350px]',
                            'p-3 gap-y-2'
                        )
                    }>
                        {genres?.map((genre) => (
                            <li
                                className='hover:underline'
                                key={genre._id}>
                                <Link to={`/genre/${genre._id}`}>{genre.title}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default GenresDropdown;
