import { Cone } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";

export default function Grade() {
   return (
      <>
         <SideBar />

         <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
               <HeadBar />
            </div>

            {/* Main Section */}
            <main className="mt-10 lg:mt-0 p-5 min-h-[calc(100vh-80px)]">
               
               {/* Header
               <div className="flex justify-between">
                  <div>
                     <h1 className="font-black text-2xl text-slate-700">
                        COURSES
                     </h1>

                     <p className="text-gray-600">
                        Manage your courses here.
                     </p>
                  </div>
               </div> */}

               {/* Under Development */}
               <div className="flex flex-col items-center justify-center text-center h-[70vh]">
                  
                  <div className="p-6 rounded-full bg-amber-100 mb-5 shadow-sm">
                     <Cone className="w-16 h-16 text-amber-500" />
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-black text-slate-700">
                     Under Development
                  </h2>

                  <p className="mt-2 text-gray-500 max-w-md">
                     This page is currently being developed. 
                     Please check back later for updates and new features.
                  </p>

               </div>
            </main>
         </div>
      </>
   );
}