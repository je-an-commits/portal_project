import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {
   ClipboardPenLine,
   Clock,
   House,
   Menu,
   X,
   GraduationCap,
   ChartNoAxesColumn,
   LogOut,
   UserCog,
} from "lucide-react";

export default function SideBar() {
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();

   const sidebarItems = [
      {
         name: "Dashboard",
         href: "/dashboard",
         current: true,
         icon: <House size={18} />,
      },
      {
         name: "Enrollment",
         href: "/enrollment",
         icon: <ClipboardPenLine size={18} />,
      },
      {
         name: "Courses",
         href: "/courses",
         icon: (
            <GraduationCap size={18}/>
         ),
      },
      {
         name: "Grades",
         href: "/grades",
         icon: (
            <ChartNoAxesColumn size={18} />
         ),
      },
      {
         name: "Appointment",
         href: "/appointment",
         icon: <Clock size={18} />,
      },
      {
         name: "Profile",
         href: "/profile",
         icon: <UserCog size={18} />,
      },
   ];

   function logout() {
    navigate("/");
   }
   return (
    <>
      {/* Top bar (mobile) */}
         <div className="flex lg:hidden p-4 justify-between align-center bg-green-900 text-gray-200 fixed top-0  w-full">
            <button onClick={() => setOpen(true)}>
               <Menu className="cursor-pointer" size={24} />
            </button>
            <h1 className="text-bold">Dashboard</h1>
            <img src="./logo.png" alt=""  width={30} height={20}/>
         </div>

         {/* Overlay */}
         {open && (
            <div
               className="fixed inset-0 bg-black/40 z-40"
               onClick={() => setOpen(false)}
            />
         )}

         {/* Sidebar */}
         <aside
            className={`
               fixed top-0 left-0 z-50 h-full w-[264px] bg-white dark:bg-neutral-900
               border-r border-slate-300 dark:border-neutral-700
               transform transition-transform duration-300
               ${open ? "translate-x-0" : "-translate-x-full"}
               lg:translate-x-0
               flex flex-col py-6 px-4 overflow-auto
            `}
         >
            {/* Close button (mobile only) */}
            <div className="lg:hidden flex justify-end mb-4">
               <button onClick={() => setOpen(false)}>
                  <X className="text-white cursor-pointer" size={24} />
               </button>
            </div>

            {/* Logo */}
            <div className="flex gap-3 mb-8 px-3">
               <img src="./logo.png" className="h-9 w-auto" />
               <div>
                  <h1 className="font-black text-white">
                     STUDENT PORTAL
                  </h1>
                  <h3 className="text-gray-400 text-[12px]">
                     CVSU TANZA CAMPUS
                  </h3>
               </div>
            </div>

            {/* Nav */}
            <nav className="flex-1">
               <ul className="space-y-2 text-sm font-medium">
                  {sidebarItems.map((item) => (
                     <li key={item.name}>
                        <NavLink to={item.href}
                                className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2 rounded-md transition
                                ${
                                isActive
                                    ? "bg-green-800 text-white"
                                    : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800"
                                }`
                            }
                        >
                           {item.icon}
                           {item.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </nav>

            {/* User */}
            <a href="#" onClick={logout} className=" lg:hidden flex items-center gap-4 mt-6 px-3 py-2 rounded-md text-red-800 font-bold hover:bg-slate-100 dark:hover:bg-neutral-800 transition">
               <LogOut />
               <div>
                  <h1>LOGOUT</h1>
               </div>
            </a>
         </aside>
        </>
   );
};