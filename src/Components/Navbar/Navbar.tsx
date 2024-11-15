"use client"
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { selectCurrentUser } from "@/redux/features/Auth/authSlice";


const Navbar = () => {
    const user = useSelector(selectCurrentUser);
    return ( 
        <div className="bg-white px-6 py-5 w-full sticky top-0 z-30 xl:flex items-center justify-between hidden">
            <h1 className='text-neutral-20 text-xl font-medium leading-[38px]'>Welcome back, <span className="text-primary-10 font-bold">{user?.full_name}</span></h1>
            <UserDropdown/>
        </div>
    );
};

export default Navbar;