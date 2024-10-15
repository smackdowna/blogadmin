/* eslint-disable react/no-unescaped-entities */
"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";  // Edit icon
import { RiDeleteBin6Line } from "react-icons/ri";  // Delete icon
import { useState } from 'react';
import Modal from "../Modal/Modal";
import { RxCross2 } from "react-icons/rx";


const ActionMenu = () => {
    const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-end absolute top-3 right-1 lg:right-3">
            {/* Three dots button */}
            <button onClick={handleMenuToggle}>
                <BsThreeDotsVertical className="text-xl text-neutral-20" />
            </button>
            
            {/* Dropdown menu */}
            {isMenuOpen && (
                <div className="absolute top-8 right-0 w-40 bg-white shadow-md border rounded-md z-10">
                    <ul className="py-2">
                        {/* Edit Option */}
                        <li 
                        onClick={() => setOpenDeleteConfirmModal(true)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black flex items-center gap-2"
                        >
                            <FiEdit className="text-lg" />
                            Edit
                        </li>
                        {/* Delete Option */}
                        <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center gap-2"
                            onClick={() => setOpenDeleteConfirmModal(true)}
                        >
                            <RiDeleteBin6Line className="text-lg" />
                            Delete
                        </li>
                    </ul>
                </div>
            )}

<Modal
           openModal={openDeleteConfirmModal}
        setOpenModal={setOpenDeleteConfirmModal}
        classNames="w-full max-w-[600px] h-[200px] p-5"
           >
            <div className="flex items-center justify-between border-b border-primary-20 pb-4">
            <h1 className='text-neutral-20 text-xl font-semibold leading-[38px]'>Are you sure want to delete this?</h1>
            <RxCross2 onClick={() => setOpenDeleteConfirmModal(false)} className="text-xl cursor-pointer"/>
            </div>

            <p className='text-neutral-20 leading-[38px] mt-3'>Once it is deleted, you won't be able to revert this.</p>

            <div className="flex items-center justify-end gap-5 mt-3">
            <button onClick={() => setOpenDeleteConfirmModal(false)} className={`bg-primary-20 shadow text-neutral-20 rounded-lg px-4 py-2  font-semibold leading-[22px]`}>
            Cancel
          </button>
            <button className={`bg-rose-500 shadow hover:bg-primary-10/95 text-white rounded-lg px-4 py-2  font-semibold leading-[22px] w-[150px]`}>
            Delete 
          </button>
            </div>
            </Modal>
        </div>
    );
};

export default ActionMenu;
