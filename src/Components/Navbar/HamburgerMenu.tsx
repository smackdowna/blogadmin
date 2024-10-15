"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ICONS } from "../../../public";
import { sidebarLinks } from "../Sidebar/Sidebar";
import Link from "next/link";
import { BiMenuAltLeft } from "react-icons/bi";

import { usePathname } from "next/navigation";

const HamburgerMenu = () => {
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const closestDropdown = (event.target as HTMLElement).closest(
        ".hamburgerMenu"
      );
      if (isHamburgerOpen && closestDropdown === null) {
        setIsHamburgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isHamburgerOpen]);

  return (
    <div className="relative hamburgerMenu block xl:hidden">
        <BiMenuAltLeft onClick={toggleHamburgerMenu} className="text-3xl text-neutral-30"/>
      

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Side Menu */}
      <div
        className={`flex flex-col gap-[70px] p-4 fixed inset-y-0 left-0 z-50 bg-white w-[290px] overflow-y-auto h-screen transition-all duration-300 transform ${
          isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href={"/"}
          className="text-primary-10 flex items-center gap-2 font-bold text-xl leading-[32px]"
        >
          <Image src={ICONS.blogLogo} className="size-7" alt="blog-logo" />
          Blog
        </Link>

        <div className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "bg-primary-10 text-primary-40 hover:bg-primary-10/95"
                  : "bg-white hover:bg-gray-50 text-neutral-20"
              } flex justify-between items-center w-full px-4 rounded-md cursor-pointer transition-all duration-200 py-3 `}
            >
              <div className="flex items-center gap-[8px]">
                {link.icon}
                <p className="inline text-[1rem] font-[400]">{link.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
