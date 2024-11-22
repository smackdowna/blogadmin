/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import FileInput from "./FileInput";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useCreateBlogMutation } from "@/redux/features/Blog/blogApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/features/Category/categoryApi";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type CreateBlogFormInputs = {
  title: string;
  metadata: string;
  tags: string[];
  category: string;
  subCategory: string;
};

const CreateBlogForm = () => {
  const { data: allCategories } = useGetAllCategoriesQuery({});
  const router = useRouter();
  const [createBlog] = useCreateBlogMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateBlogFormInputs>();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setContentError("");
    if (content?.length === 0) {
      setContentError("");
    } else if (content?.length < 1) {
      setContentError("Content is required");
    } else {
      setContentError("");
    }
  }, [content]);

  const handleCreateBlog: SubmitHandler<CreateBlogFormInputs> = async (
    data
  ) => {
    const formData = new FormData();
    formData.append("title", JSON.stringify(data.title));
    formData.append("metaDescription", JSON.stringify(data.metadata));
    formData.append("content", JSON.stringify(content));
    formData.append("tags", JSON.stringify(tags));
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // console.log(formData.get('file'))
    // console.log(formData.get('tags'))

    toast.promise(createBlog(formData).unwrap(), {
      loading: "Creating blog...",
      success: (response) => {
        router.push("/dashboard/blogs");
        return response?.message || "Blog created successfully!";
      },
      error: (err) => {
        console.error("Error create blog:", err);
        return "Failed to create blog.";
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setValue("tags", [...tags, newTag]);
      }
      e.currentTarget.value = "";
    }
  };

  // Function to remove a tag
  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <div className="w-full space-y-7 rounded-lg border bg-white p-7 sm:p-10 mt-7">
      {/* onSubmit={handleSubmit(handleCreateBlog)} */}
      <form
        onSubmit={handleSubmit(handleCreateBlog)}
        className="flex flex-col-reverse lg:flex-row gap-5"
      >
        <div className="space-y-5 w-full lg:w-[70%]">
          <div className="space-y-2 text-sm">
            <label htmlFor="title" className="block text-zinc-700 font-medium">
              Title
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="title"
              placeholder="Enter title"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <label
              htmlFor="metadata"
              className="block text-zinc-700 font-medium"
            >
              Metadata
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="metadata"
              placeholder="Enter metadata"
              type="text"
              {...register("metadata", { required: "Metadata is required" })}
            />
            {errors.metadata && (
              <p className="text-red-500 text-xs">{errors.metadata.message}</p>
            )}
          </div>

          {/* <div className="space-y-2 text-sm">
            <label htmlFor="category" className="block text-zinc-700 font-medium">Category</label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="category"
              placeholder="Enter category"
              type="text"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
          </div> */}

          <div className="space-y-2 text-sm">
            <label
              htmlFor="category"
              className="block text-zinc-700 font-medium"
            >
              Category and Sub Category
            </label>
            <div className="flex gap-4">
              {/* Category Dropdown */}
              <select
                id="category"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                {allCategories?.map((cat: any, index: number) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Subcategory Dropdown */}
              <select
                id="subCategory"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
                {...register("subCategory", {
                  required: "Sub category is required",
                })}
              >
                <option value="">Select Subcategory</option>
                {allCategories
                  ?.find((cat: any) => cat._id === watch("category"))
                  ?.subCategories.map((subCat: any) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* Validation Messages */}
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
            {errors.subCategory && (
              <p className="text-red-500 text-xs">
                {errors.subCategory.message}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor="tags" className="block text-zinc-700 font-medium">
              Tags
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="tags"
              placeholder="Enter tags and press Enter"
              type="text"
              onKeyDown={handleKeyDown}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-xl border px-3 py-1 text-sm text-black"
                >
                  <span>{tag}</span>
                  <AiOutlineClose
                    className="cursor-pointer text-red-500"
                    onClick={() => removeTag(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <label
              htmlFor="content"
              className="block text-zinc-700 font-medium"
            >
              Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
            {contentError && (
              <span className="text-warning-10 text-start">{contentError}</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-primary-10 px-5 py-2 text-white transition-colors hover:bg-primary-10/95"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          {/* File input component */}
          <FileInput onFileSelect={setSelectedFile} />
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
