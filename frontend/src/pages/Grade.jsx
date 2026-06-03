
import { AccordionBasic } from "@/components/GradeAccordion";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Grade() {
   const [gr, setGr] = useState([])
    const { user, api } = useAuth();

    useEffect(() => {
        if(!user?.id) return;
        const fetchData = async () => {
            try {
                const res = await api.get(`/student/grades/${user.id}`)
                setGr(res.data.grades)
            } catch(err) {
                console.error("Failed to fetch grades:", err)
            }
        };
        fetchData();
    }, [user?.id]);
    
   return (
      <>
         <SideBar />

         <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
               <HeadBar />
            </div>

            {/* Main Section */}
            <main className="mt-16 lg:mt-0 p-5 min-h-[calc(100vh_-_80px)]">
               
               {/* Header */}
               <div className="flex justify-between mb-5">
                  <div>
                     <h1 className="font-black text-2xl text-slate-700">
                        GRADES
                     </h1>

                     <p className="text-gray-600">
                        A complete chronological history of your academic records.
                     </p>
                  </div>
               </div> 

               <AccordionBasic grades={gr} />

               {/* Under Development */}
               {/* <div className="flex flex-col items-center justify-center text-center h-[70vh]">
                  
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

               </div> */}
            </main>
         </div>
      </>
   );
}