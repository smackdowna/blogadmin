"use client";
// import UserDropdown from "./UserDropdown";
import { selectCurrentUser } from "@/redux/features/Auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";
const UserDropdown = dynamic(() => import("./UserDropdown"), { ssr: false });

type TUser = {
  _id: string;
  full_name: string;
  email: string;
};

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser) as TUser | null;
  return (
    <div className="bg-white px-6 py-5 w-full sticky top-0 z-30 xl:flex items-center justify-between hidden">
      <h1 className="text-neutral-20 text-xl font-medium leading-[38px]">
        Welcome back,{" "}
        <span className="text-primary-10 font-bold">{user?.full_name}</span>
      </h1>
      <UserDropdown user={user} />
    </div>
  );
};

export default Navbar;
