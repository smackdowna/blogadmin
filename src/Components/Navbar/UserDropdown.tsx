'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaSortDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/Auth/authSlice';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import Link from "next/link";

type TUser = {
  _id: string;
  full_name: string;
  email: string;
};

const UserDropdown = ({user}:{user?:TUser | null}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const dropdownLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <RxDashboard className="text-[1.3rem]" /> },
    { label: "Blogs", href: "/dashboard/blogs", icon: <RiBloggerLine className="text-[1.3rem]" /> },
    { label: "Create Blog", href: "/dashboard/create-blog", icon: <MdOutlineCreateNewFolder className="text-[1.3rem]" /> },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("https://blogbackend-theta.vercel.app/api/v1/admin/logout");

      if (response.ok) {
        dispatch(logout());
        Cookies.remove("isAuthenticated");
        router.push("/");
        toast.success("Logged out successfully.");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);
  

  return (
    <div ref={dropDownRef} className="relative w-fit text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-white xl:bg-gray-50 text-neutral-20 rounded-lg px-4 py-2 font-semibold flex items-center justify-between w-[200px]"
      >
        <span>{user?.full_name || "Guest"}</span>
        <FaSortDown className="leading-none text-start" />
      </button>

      {
        open &&
        <ul className={` absolute top-12 z-50 w-full space-y-1 bg-white pb-1`}>
        {dropdownLinks.map((item, idx) => (
          <Link
          onClick={() => setOpen(!open)}
            key={idx}
            href={item.href}
            className={`rounded-sm px-4 py-[10px] ${open ? "opacity-100 duration-500" : "opacity-0 duration-150"} hover:bg-gray-50 text-neutral-20 flex items-center gap-3`}
            style={{ transform: `translateY(${open ? 0 : (idx + 1) * 10}px)` }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <li
          className={`${open ? "opacity-100 duration-500" : "opacity-0 duration-150"}`}
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
      }
    </div>
  );
};

export default UserDropdown;