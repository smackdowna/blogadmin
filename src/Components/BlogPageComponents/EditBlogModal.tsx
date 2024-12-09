/* eslint-disable react/no-unescaped-entities */
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { useEditBlogMutation } from "@/redux/features/Blog/blogApi";
import { toast } from 'sonner'
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false, loading: () => <p>Loading...</p> });
import FileInput from './../CreateBlogComponents/FileInput';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { TBlog } from "@/types/blog.types";

type TEditBlog = {
  title: string;
  metadata: string;
  tags: string[];
  category: {
    _id : string;
    name:string;
  };
};

type TEditBlogModalProps = {
  setOpenEditBlogModal: (openEditBlogModal: boolean) => void;
  blog: TBlog;
};

const EditBlogModal : React.FC<TEditBlogModalProps> = ({ setOpenEditBlogModal, blog }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TEditBlog>();
  const editor = useRef(null);
  const [content, setContent] = useState(blog?.content);
  const [contentError, setContentError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [tags, setTags] = useState<string[]>(blog?.tags || []);

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

  const [editBlog] = useEditBlogMutation();

  const handleEditBlog: SubmitHandler<TEditBlog> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("metaDescription", data.metadata);
    formData.append("content", content);
    // formData.append("tags", JSON.stringify(tags));
    tags.map((tag, index) => {
      formData.append(`tags[${index}]`, tag)
    })
    // formData.append("category", data.category);
    // formData.append("subCategory", data.subCategory);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const id = blog?._id
  
    toast.promise(
      editBlog({ id, formData }).unwrap(),
      {
        loading: 'Updating blog...',
        success: (response) => {
          setOpenEditBlogModal(false);
          return response?.message || 'Blog updated successfully!';
        },
        error: (err) => {
          console.error('Error updating blog:', err);
          return 'Failed to update blog.';
        },
      }
    );
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
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-primary-20 pb-4">
        <h1 className='text-neutral-20 text-xl font-semibold leading-[38px]'>Update Blog Details</h1>
        <RxCross2 onClick={() => setOpenEditBlogModal(false)} className="text-xl cursor-pointer" />
      </div>

      <form className="space-y-5 w-full" onSubmit={handleSubmit(handleEditBlog)}>
        {/* Image section with edit functionality */}
        {blog?.thumbnail?.thumbnailUrl && !isEditingImage ? (
          <div className="relative">
            <Image src={blog.thumbnail.thumbnailUrl} width={200} height={150} alt={blog.thumbnail?.name} className="w-full h-[300px] object-cover rounded-xl" />
            <button
              type="button"
              className="absolute top-6 right-2 bg-gray-200 px-2 py-1 rounded-md text-sm"
              onClick={() => setIsEditingImage(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <FileInput onFileSelect={setSelectedFile} />
        )}

        <div className="space-y-2 text-sm">
          <label htmlFor="title" className="block text-zinc-700 font-medium">Title</label>
          <input
            defaultValue={blog?.title}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="title"
            placeholder="Enter title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-2 text-sm">
          <label htmlFor="metadata" className="block text-zinc-700 font-medium">Metadata</label>
          <input
            defaultValue={blog?.metaDescription}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="metadata"
            placeholder="Enter metadata"
            type="text"
            {...register("metadata", { required: "Metadata is required" })}
          />
          {errors.metadata && <p className="text-red-500 text-xs">{errors.metadata.message}</p>}
        </div>

        <div className="space-y-2 text-sm">
          <label htmlFor="category" className="block text-zinc-700 font-medium">Category</label>
          <input
            defaultValue={blog?.category?.name}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="category"
            placeholder="Enter category"
            type="text"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
        </div>

        {/* Tags section with edit functionality */}
        <div className="space-y-2 text-sm">
          <label htmlFor="tags" className="block text-zinc-700 font-medium">Tags</label>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="tags"
            placeholder="Enter tags and press Enter"
            type="text"
            onKeyDown={handleKeyDown}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2 bg-white rounded-xl border px-3 py-1 text-sm text-black">
                <span>{tag}</span>
                <AiOutlineClose className="cursor-pointer text-red-500" onClick={() => removeTag(index)} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <label htmlFor="content" className="block text-zinc-700 font-medium">Content</label>
          <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
          {contentError && <span className="text-warning-10 text-start">{contentError}</span>}
        </div>

        <div className="flex gap-4 justify-end">
          <button onClick={() => setOpenEditBlogModal(false)} className={`bg-primary-20 shadow text-neutral-20 rounded-lg px-4 py-2 font-semibold leading-[22px]`}>
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-primary-10 px-5 py-2 text-white transition-colors hover:bg-primary-10/95">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogModal;
