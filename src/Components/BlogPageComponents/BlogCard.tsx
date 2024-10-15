/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { IMAGES } from "../../../public";
import ActionMenu from "./ActionMenu";


const BlogCard = () => {
    

    return (
        <div className='border border-neutral-30/40 rounded-xl p-6 flex flex-col lg:flex-row items-center gap-6 relative bg-white'>
            <Image src={IMAGES.blogImg} className="w-full xl:w-[400px] h-[300px] object-cover rounded-xl" alt="blog-img" />

            <div className="flex flex-col gap-6">
                {/* Three Dots Menu */}
                <ActionMenu id={"id"}/>

                <div>
                    <h1 className='text-black text-lg font-semibold leading-[32px]'>All BlogCard</h1>
                    <p className='text-neutral-25 text-base leading-5 mt-[10px]'>
                        Travel isn't just about the destination; it's about the experiences, the stories, and the people you meet along the way. 
                        Join me as I share my favorite hidden gems and travel tips that will ignite your wanderlust and inspire your next adventure.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Image src={IMAGES.profileImg} className="size-12 rounded-full" alt="profile-img" />
                    <div>
                        <h1 className='text-black text-base font-medium leading-6'>Rahul Sutradhar</h1>
                        <p className='text-neutral-90 text-base leading-6'>October 15, 2024</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-3 h-9 rounded-xl border border-neutral-30 text-black font-semibold leading-5 flex items-center justify-center">Adventure</div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
