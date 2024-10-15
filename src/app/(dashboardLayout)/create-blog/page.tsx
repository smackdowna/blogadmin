import CreateBlogForm from "@/Components/CreateBlogComponents/CreateBlogForm";


const CreateBlog = () => {
    return ( 
        <div className="bg-white rounded-xl px-6 py-4 w-full sticky top-0 z-20">
           <h1 className='text-neutral-20 text-3xl font-bold leading-[38px]  border-b border-primary-20 pb-4'>Create New Blog</h1>

           <CreateBlogForm/>
        </div>
    );
};

export default CreateBlog;