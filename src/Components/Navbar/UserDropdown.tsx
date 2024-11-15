'use client'
import React, { useEffect, useRef, useState } from 'react';
import { FaSortDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '@/redux/features/Auth/authSlice';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const UserDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('isAuthenticated');
    router.push("/login");
    toast.success("Logged out successfully.");
  };
  const dropdownLinks = [
    {
      label: "Dashboard",
      href: "/",
      icon: <RxDashboard className="text-[1.3rem]" />,
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <RiBloggerLine className="text-[1.3rem]" />,
    },
    {
      label: "Create Blog",
      href: "/create-blog",
      icon: <MdOutlineCreateNewFolder className="text-[1.3rem]" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
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
        className="bg-white xl:bg-gray-50 text-neutral-20 rounded-lg px-4 py-2 font-semibold flex items-center justify-between w-[200px]"
      >
        {user?.full_name}
        <FaSortDown className="leading-none text-start"/>
      </button>

      <ul className={`${open ? 'visible' : 'invisible'} absolute top-12 z-50 w-full space-y-1 bg-white pb-1`}>
        {dropdownLinks.map((item, idx) => (
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
          style={{ transform: `translateY(${open ? 0 : (dropdownLinks.length + 1) * 10}px)` }}
        >
          <button
            onClick={handleLogout}
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
