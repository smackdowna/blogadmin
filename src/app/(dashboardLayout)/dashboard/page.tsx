"use client"
import StatusCard from "@/Components/DashboardComponents/StatusCard";
import { useGetAllBlogsQuery } from "@/redux/features/Blog/blogApi";
import { useGetAllCategoriesQuery } from "@/redux/features/Category/categoryApi";
import { RiBloggerLine } from "react-icons/ri";


const Dashboard = () => {
  const {data:allBlogs}= useGetAllBlogsQuery({});
  const {data:allCategories}=useGetAllCategoriesQuery({});
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatusCard 
      title="Total Blogs"
      value={allBlogs?.data?.length}
      icon={<RiBloggerLine />}
      iconBgColor="bg-primary-10/10"
      />

      <StatusCard 
      title="Total Categories"
      value={allCategories?.length}
      icon={<RiBloggerLine />}
      iconBgColor="bg-primary-10/30"
      />
    </div>
  );
};

export default Dashboard;