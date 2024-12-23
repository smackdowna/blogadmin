"use client";

import BlogCard from "@/Components/BlogPageComponents/BlogCard";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/features/Blog/blogApi";
import { TBlog } from "@/types/blog.types";
import BlogCardLoader from "@/Components/Loaders/BlogCardLoader";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

const Blogs = () => {
  const [searchText, setSearchText] = useState("");
  const { data: allBlogs, isLoading, isFetching } = useGetAllBlogsQuery({ title: searchText });

  return (
    <div className="bg-white rounded-xl px-3 py-3 md:px-6 md:py-4 w-full">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between border-b border-primary-20 pb-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-neutral-20 text-xl md:text-3xl font-bold leading-[38px]">
            All Blogs
          </h1>
          <div className="flex items-center gap-5">
            <Link
              href="/create-blog"
              className={`bg-primary-10 hover:bg-primary-10/95 text-white rounded-lg px-4 py-2  font-semibold leading-[22px] block md:hidden`}
            >
              Create New Blog
            </Link>

            <div className="relative mr-5">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="px-4 py-2 border border-border rounded-md w-full pl-[40px] outline-none focus:border-primary"
                placeholder="Search..."
              />
              <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/create-blog"
          className={`bg-primary-10 hover:bg-primary-10/95 text-white rounded-lg px-4 py-[10px] font-semibold leading-[22px] hidden w-full md:w-[290px] md:flex items-center justify-center`}
        >
          Create New Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        {isLoading || isFetching ? (
          <BlogCardLoader />
        ) : allBlogs?.data?.length > 0 ? (
          allBlogs?.data?.map((blog: TBlog) => (
            <BlogCard key={blog?._id} blog={blog} />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
