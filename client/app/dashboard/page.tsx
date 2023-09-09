import Sidebar from "@/components/dashboard/Sidebar";
import ChatContainer from "@/components/dashboard/ChatContainer";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex bg-cover  bg-no-repeat">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Dashboard;
