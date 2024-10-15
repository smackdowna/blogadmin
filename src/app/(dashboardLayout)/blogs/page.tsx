import BlogCard from "@/Components/BlogPageComponents/BlogCard";
import Image from "next/image";
import { ICONS } from "../../../../public";
import Link from "next/link";


const Blogs = () => {
    return (
        <div className='bg-white rounded-xl px-6 py-4 w-full'>
            <div className="flex items-center justify-between border-b border-primary-20 pb-4">
            <h1 className='text-neutral-20 text-3xl font-bold leading-[38px]'>All Blogs</h1>

            <div className="flex items-center gap-6">
            <div className="relative input-nav-flex">
            <Image
              src={ICONS.searchIcon} 
              alt="search-icon" 
              className="size-6 absolute left-4 top-5 transform -translate-y-1/2"
            />
            <input 
              type="text" 
              placeholder="Search" 
              className={`text-black bg-gray-50 border-primary-10 transition duration-300 focus:shadow pl-11 max-w-[300px] pr-4 py-2 rounded-lg focus:outline-none`}
            />
          </div>

          <Link href="/create-blog" className={`bg-primary-10 hover:bg-primary-10/95 text-white rounded-lg px-4 py-2  font-semibold leading-[22px]`}>
            Create New Blog
          </Link>
          </div>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6 mt-8">
                <BlogCard/>
                <BlogCard/>
            </div>
        </div>
    );
};

export default Blogs;