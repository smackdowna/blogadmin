const BlogCardLoader = () => {
    return (
      <div className='border border-neutral-30/40 rounded-xl p-6 flex flex-col lg:flex-row items-center gap-6 relative bg-white animate-pulse'>
        {/* Image skeleton */}
        <div className="w-full xl:w-[400px] h-[300px] bg-gray-200 rounded-xl"></div>
  
        <div className="flex flex-col gap-6 w-full">
          {/* ActionMenu skeleton */}
          <div className="w-6 h-6 bg-gray-200 rounded-full self-end"></div>
  
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
  
          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
  
          {/* Author details skeleton */}
          <div className="flex items-center gap-4">
            <div className="size-12 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-32"></div>
              <div className="h-4 bg-gray-200 rounded-md w-24"></div>
            </div>
          </div>
  
          {/* Category skeleton */}
          <div className="h-9 w-24 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  };
  
  export default BlogCardLoader;
  