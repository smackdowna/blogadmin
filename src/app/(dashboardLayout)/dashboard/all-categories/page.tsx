// import Image from "next/image";
// import { ICONS } from "../../../../public";
import Link from "next/link";
import CategoryCard from '../../../../Components/CategoryCard/CategoryCard';

type TSubCategory = {
  _id: string;
  name: string;
};

type TCategory={
  _id:string;
  name:string;
  description:string[];
  subCategories:TSubCategory[]
  thumbnail:{
    fileId:string;
    name:string;
    url:string;
    thumbnailUrl:string;
    _id:string;
  }
}

const AllCategories = async () => {
  const response = await fetch(
    `https://blogbackend-theta.vercel.app/api/v1/category`,
    {
      cache : 'no-store'
    }
  );
  const allCategories = await response.json();

    return (
        <div className='bg-white rounded-xl px-3 py-3 md:px-6 md:py-4 w-full'>
            <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between border-b border-primary-20 pb-4">

            <div className="flex items-center justify-between w-full">
            <h1 className='text-neutral-20 text-xl md:text-3xl font-bold leading-[38px]'>All Categories</h1>
            <Link href="/dashboard/create-category" className={`bg-primary-10 hover:bg-primary-10/95 text-white rounded-lg px-4 py-2  font-semibold leading-[22px] block md:hidden`}>
            Add New Category
          </Link>
          </div>

            {/* <div className="flex flex-col-reverse md:flex-row w-full items-center gap-6">
            <div className="relative input-nav-flex w-full">
            <Image
              src={ICONS.searchIcon} 
              alt="search-icon" 
              className="size-6 absolute left-4 top-5 transform -translate-y-1/2"
            />
            <input 
              type="text" 
              placeholder="Search" 
              className={`text-black bg-gray-50 border-primary-10 transition duration-300 focus:shadow pl-11 w-full max-w-full md:max-w-[300px] pr-4 py-2 rounded-lg focus:outline-none`}
            />
          </div> */}

          <Link href="/dashboard/create-category" className={`bg-primary-10 hover:bg-primary-10/95 text-white rounded-lg px-4 py-2 font-semibold leading-[22px] hidden w-full md:w-[290px] md:flex items-center justify-center`}>
            Add New Category
          </Link>
          {/* </div> */}
          </div>

            <div className="grid grid-cols-1 gap-6 mt-8">
              {
                allCategories?.map((category:TCategory) => 
                  <CategoryCard key={category?._id} category={category} />
                )
              }
            </div>
        </div>
    );
};

export default AllCategories;