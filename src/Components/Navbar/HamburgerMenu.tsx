"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ICONS } from "../../../public";

const HamburgerMenu = () => {
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
    <div className="relative hamburgerMenu block lg:hidden">
      <Image
        onClick={toggleHamburgerMenu}
        src={ICONS.menu}
        alt="menu-icon"
        className="size-8 cursor-pointer"
      />

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white w-[290px] overflow-y-auto h-screen transition-all duration-300 transform ${
          isHamburgerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full mt-5">Hello</div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
