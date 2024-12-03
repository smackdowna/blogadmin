/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
// import { IMAGES } from "../../../public";
import ActionMenu from "./ActionMenu";
import { TBlog } from "@/types/blog.types";


const BlogCard = ({blog} : {blog:TBlog}) => {
    const {
        title,
        // metaDescription,
        content,
        // category,
        tags,
        thumbnail: { name, thumbnailUrl },
      } = blog;
      const truncateContent = (text: string, limit: number) => {
        return text.length > limit ? `${text.slice(0, limit)}...` : text;
      };
      
    return (
        <div className='border border-neutral-30/40 rounded-xl p-6 flex flex-col lg:flex-row items-center gap-6 relative bg-white'>
             <Image
        quality={100}
        src={thumbnailUrl}
        width={400}
        height={350}
        className="w-full xl:w-[400px] h-[350px] object-cover rounded-xl"
        alt={name}
      />

            <div className="flex flex-col gap-6">
                {/* Three Dots Menu */}
                <ActionMenu blog={blog}/>

                <div>
                    <h1 className='text-black text-lg font-semibold leading-[32px]'>{title}</h1>
                    <p className='text-neutral-25 text-base leading-5 mt-[10px]' dangerouslySetInnerHTML={{ __html: truncateContent(content, 500) }}/>
                </div>

              

                <div className="flex flex-wrap items-center gap-4">
                    {
                        tags?.map((tag, index) => 
                            <div key={index} className="px-3 h-9 rounded-xl border border-neutral-30 text-black font-semibold leading-5 flex items-center justify-center">{tag}</div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
