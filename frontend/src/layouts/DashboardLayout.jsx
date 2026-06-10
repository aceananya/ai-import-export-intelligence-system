import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-[270px] min-h-screen w-full bg-slate-100">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;