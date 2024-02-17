import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CloseIcon } from '../../Assets/svgs/tsSvgs';
import { addClassNames } from '../../store/utils/functions';

const ChangeAvatarModal = ({ show, onClose }) => {

    const closeButtonRef = React.useRef();

    // Close on escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleClose = () => {
        onClose(); // Pass closure to ensure correct state update
    };

    return (
        <Transition show={show}>
            <div className={
                addClassNames(
                    "fixed inset-0 overflow-hidden z-[1000] bg-transparent ",
                    "flex items-center justify-center"
                )
            }>
                <div className="absolute inset-0 backdrop-filter backdrop-brightness-[0.3]" onClick={handleClose}></div>

                <Transition.Child
                    enter="transition duration-150 ease-out"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition duration-100 ease-in-out"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className={
                        addClassNames(
                            "relative shadow-xl rounded-lg  p-[37px]  text-left overflow-auto scrollbar-thin scrollbar-thumb-gray-200 sm:scrollbar-thumb-gray-300",
                            "backdrop-blur-[13px] bg-[#FFFFFF1A] border border-[#4B4B4B]",
                            "min-w-[52vw] !max-w-[1221px] "
                        )
                    }>
                        {/* Top section with heading and close button */}
                        <div className="flex items-center justify-between mb-[35px]">
                            <h3 className="text-[32px] font-medium leading-6 text-white">
                                Choose your avatar below
                            </h3>
                            <button
                                type="button"
                                ref={closeButtonRef}
                                onClick={handleClose}
                                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        {/* Divider */}
                        <div className="mb-6 border-b border-[#4B4B4B]" />
                        <div className="mt-5" aria-labelledby="modal-title">
                            {/* Add your avatar selection/upload UI here */}
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    );
};

export default ChangeAvatarModal;
