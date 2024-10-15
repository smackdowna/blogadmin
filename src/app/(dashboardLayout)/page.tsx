import StatusCard from "@/Components/DashboardComponents/StatusCard";
import { RiBloggerLine } from "react-icons/ri";


const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-6">
      <StatusCard 
      title="Total Blogs"
      value={10}
      icon={<RiBloggerLine />}
      iconBgColor="bg-primary-10/10"
      />

      <StatusCard 
      title="Total Blogs"
      value={10}
      icon={<RiBloggerLine />}
      iconBgColor="bg-primary-10/60"
      />
    </div>
  );
};

export default Dashboard;