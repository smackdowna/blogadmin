'use client'
import React, { useEffect, useRef, useState } from 'react';
import { FaSortDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon
import Link from "next/link";

const UserDropdown = () => {
  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/",
      icon: <RxDashboard className="text-[1.3rem] " />,
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <RiBloggerLine className="text-[1.3rem] " />,
    },
    {
      label: "Create Blog",
      href: "/create-blog",
      icon: <MdOutlineCreateNewFolder className="text-[1.3rem] " />,
    },
  ];

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={dropDownRef} className="relative w-fit text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-gray-50 text-neutral-20 rounded-lg px-4 py-2 font-semibold flex items-center justify-between w-[200px]"
      >
        Rahul Sutradhar
        <FaSortDown />
      </button>

      <ul className={`${open ? 'visible' : 'invisible'} absolute top-12 z-50 w-full space-y-1 bg-white pb-1`}>
        {sidebarLinks.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`rounded-sm px-4 py-[10px] ${open ? 'opacity-100 duration-500' : 'opacity-0 duration-150'} hover:bg-gray-50 text-neutral-20 flex items-center gap-3`}
            style={{ transform: `translateY(${open ? 0 : (idx + 1) * 10}px)` }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* Logout button with animation */}
        <li
          className={` ${open ? 'opacity-100 duration-500' : 'opacity-0 duration-150'}`}
          style={{ transform: `translateY(${open ? 0 : (sidebarLinks.length + 1) * 10}px)` }}
        >
          <button
            onClick={() => console.log('Logged out')}
            className="rounded-sm px-4 py-[10px] w-full hover:bg-gray-50 text-neutral-20 flex items-center gap-3"
          >
            <FiLogOut className="text-[1.3rem]" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
