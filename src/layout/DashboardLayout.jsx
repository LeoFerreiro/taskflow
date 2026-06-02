import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ activeSection, setActiveSection, children }) {
  return (
    <div className="min-h-screen bg-[#080a12] text-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="min-h-screen lg:pl-72">
        <Topbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
