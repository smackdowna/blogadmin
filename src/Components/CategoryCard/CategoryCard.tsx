import Image from "next/image";
// import { IMAGES } from "../../../public";

type TSubCategory = {
  _id: string;
  name: string;
};

type TCategory={
 category:{
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
}

const CategoryCard: React.FC<TCategory> = ({ category }) => {
  return (
    <div className="border border-neutral-30/40 rounded-xl p-6 flex flex-col lg:flex-row gap-6 relative bg-white">
      <Image
        quality={100}
        src={category.thumbnail.thumbnailUrl}
        width={400}
        height={350}
        className="w-full xl:w-[400px] h-[350px] object-cover rounded-xl"
        alt={"category"}
      />

      <div className="flex flex-col gap-6">
        {/* Three Dots Menu */}
        {/* <ActionMenu blog={blog}/> */}

        <div>
          <h1 className="text-black text-lg font-semibold leading-[32px]">
            {category?.name}
          </h1>
          <p className="text-neutral-25 text-base leading-5 mt-[10px]">{category?.description[0]}</p>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            {category?.subCategories?.map((subCategory: TSubCategory) => (
              <div
                key={subCategory?._id}
                className="px-3 h-9 rounded-xl border border-neutral-30 text-black font-semibold leading-5 flex items-center justify-center"
              >
                {subCategory?.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
