import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full md:ml-[270px] min-h-screen bg-slate-100">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;