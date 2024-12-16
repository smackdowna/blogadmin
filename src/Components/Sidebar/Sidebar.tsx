"use client";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "../../../public";
import { RxDashboard } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { AiOutlineGroup } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RxDashboard className="text-[1.2rem] " />,
  },
  {
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: <RiBloggerLine className="text-[1.4rem] " />,
  },
  {
    label: "Create Blog",
    href: "/dashboard/create-blog",
    icon: <MdOutlineCreateNewFolder className="text-[1.3rem] " />,
  },
  {
    label: "Create Category",
    href: "/dashboard/create-category",
    icon: <IoCreateOutline className="text-[1.3rem] " />,
  },
  {
    label: "All Categories",
    href: "/dashboard/all-categories",
    icon: <AiOutlineGroup className="text-[1.3rem] " />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white border-r w-[250px] p-4 h-screen sticky top-0 left-0 hidden xl:flex flex-col gap-[70px]">
      <Link
        href={"/dashboard"}
        className="text-primary-10 flex items-center gap-2 font-bold text-xl leading-[32px]"
      >
        <Image src={ICONS.blogLogo2} className="size-16" alt="blog-logo"  />
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
  );
};

export default Sidebar;
