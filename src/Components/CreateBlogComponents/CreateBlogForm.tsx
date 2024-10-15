"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import FileInput from "./FileInput";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false, loading: () => <p>Loading...</p> });

type CreateBlogFormInputs = {
  title: string;
  metadata: string;
  tags: string[];
};

const CreateBlogForm = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  useEffect(() => {
    setContentError("");
    if (content?.length === 0) {
        setContentError("");
      }
    else if (content?.length < 1) {
        setContentError("Content is required");
      } else {
      setContentError("");
    }
  }, [content]);

  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateBlogFormInputs>();
  
  const [tags, setTags] = useState<string[]>([]);

  // Function to handle the form submission
  const handleCreateBlog: SubmitHandler<CreateBlogFormInputs> = (data) => {
    const blogData = {
      title: data.title,
      metadata: data.metadata,
      tags: tags,
    };
    console.log(blogData);
  };

  // Function to add a tag when the user presses Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setValue("tags", [...tags, newTag]); // Set value for form submission
      }
      e.currentTarget.value = ""; // Clear input after adding the tag
    }
  };

  // Function to remove a tag
  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags); // Update form value after removing the tag
  };

  return (
    <div className="w-full space-y-7 rounded-lg border bg-white p-7 sm:p-10 mt-7">
      <form onSubmit={handleSubmit(handleCreateBlog)} className="flex flex-col-reverse lg:flex-row gap-5">
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
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor="metadata" className="block text-zinc-700 font-medium">
              Metadata
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
              id="metadata"
              placeholder="Enter metadata"
              type="text"
              {...register("metadata", { required: "Metadata is required" })}
            />
            {errors.metadata && <p className="text-red-500 text-xs">{errors.metadata.message}</p>}
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
              onKeyDown={handleKeyDown} // Add tag on Enter
            />
            {errors.tags && <p className="text-red-500 text-xs">{errors.tags.message}</p>}
            
            {/* Display added tags */}
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
            <label htmlFor="metadata" className="block text-zinc-700 font-medium">
              Metadata
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
          <FileInput />
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
