"use client";
import { AiOutlineClose } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateCategoryMutation } from "@/redux/features/Category/categoryApi";

type CreateCategoryFormInputs = {
  category: string;
  subCategory: string[];
  bannerImage: File | null;
  description: string[];
};

const CreateCategoryPage = () => {
  const [createCategory] = useCreateCategoryMutation();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateCategoryFormInputs>();
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const handleCreateCategory: SubmitHandler<CreateCategoryFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    // formData.append("subCategory", JSON.stringify(subCategories));
    formData.append("description", JSON.stringify(descriptions));
    if (bannerImage) formData.append("file", bannerImage);


    for (const subCategory of subCategories) {
      formData.append("subCategory", subCategory);
    }

    console.log(formData.get("subCategory"))

    toast.promise(
      createCategory(formData).unwrap(),
      {
        loading: 'Creating category...',
        success: (response) => {
          router.push('/dashboard/all-categories');
          return response?.message || 'Category created successfully!';
        },
        error: (err) => {
          console.error('Error creating category:', err);
          return 'Failed to create category.';
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newSubCategory = e.currentTarget.value.trim();
      if (!subCategories.includes(newSubCategory)) {
        setSubCategories([...subCategories, newSubCategory]);
        setValue("subCategory", [...subCategories, newSubCategory]);
      }
      e.currentTarget.value = "";
    }
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newDescription = e.currentTarget.value.trim();
      setDescriptions([...descriptions, newDescription]);
      setValue("description", [...descriptions, newDescription]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
    setValue("subCategory", updatedSubCategories);
  };

  const removeDescription = (index: number) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
    setValue("description", updatedDescriptions);
  };

  return (
    <div className="bg-white rounded-xl px-6 py-4 w-full sticky top-0 z-20">
      <h1 className="text-neutral-20 text-3xl font-bold leading-[38px] border-b border-primary-20 pb-4">
        Create New Category
      </h1>

      <div className="w-full space-y-7 rounded-lg border bg-white p-7 sm:p-10 mt-7">
        <form onSubmit={handleSubmit(handleCreateCategory)} className="flex flex-col gap-5 max-w-[500px] mx-auto">
          <div className="space-y-2 text-sm">
            <label htmlFor="category" className="block text-zinc-700 font-medium">Category</label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="category"
              placeholder="Enter category"
              type="text"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor="subCategory" className="block text-zinc-700 font-medium">Sub Category</label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="subCategory"
              placeholder="Enter sub category and press Enter to add new"
              type="text"
              onKeyDown={handleKeyDown}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {subCategories.map((subCategory, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-xl border px-3 py-1 text-sm text-black">
                  <span>{subCategory}</span>
                  <AiOutlineClose className="cursor-pointer text-red-500" onClick={() => removeTag(index)} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor="bannerImage" className="block text-zinc-700 font-medium">Banner Image</label>
            <input
              className="flex w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="bannerImage"
              type="file"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor="description" className="block text-zinc-700 font-medium">Description</label>
            <textarea
              className="flex h-20 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="description"
              placeholder="Enter description and press Enter"
              onKeyDown={handleDescriptionKeyDown}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {descriptions.map((description, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-xl border px-3 py-1 text-sm text-black relative">
                  <span>{description}</span>
                  <AiOutlineClose className=" absolute top-2 right-2 cursor-pointer text-red-500" onClick={() => removeDescription(index)} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="rounded-md bg-primary-10 px-5 py-2 text-white transition-colors hover:bg-primary-10/95">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
