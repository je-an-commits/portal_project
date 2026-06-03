
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function Course() {
   const [subs, setSubs] = useState([])
   const [ sem, setSem ] = useState(() => {
      const stored = sessionStorage.getItem("sem");
      return stored ? JSON.parse(stored) : null;
   });
   const { user } = useAuth();
   useEffect(() => {
        const fetchData = async () => {
            const resSubs = await axios.get(`https://heartbroken-mattie-cuter.ngrok-free.dev/student/subjects/${user.id}/${sem?.[0].semester}/${sem?.[0].acad_year}`, { withCredentials: true })
            setSubs(resSubs.data.subjects)
        };

        fetchData();
    }, []);
   return (
      <>
         <SideBar />

         <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
               <HeadBar />
            </div>

            {/* Main Section */}
            <main className="mt-15 lg:mt-0 p-5 min-h-[calc(100vh-80px)]">
               
               
               <div className="flex justify-between">
                  <div>
                     <h1 className="font-black text-lg lg:text-2xl text-slate-700">
                        COURSES
                     </h1>

                     <p className="text-gray-600 text-[12px] lg:text-[16px]">
                        Preview your courses here.
                     </p>
                  </div>
               </div>

               <div className="w-full max-w-7xl mx-auto mt-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 sm:p-5 rounded-t-2xl bg-green-900">
                     <h1 className="text-[12px] sm:text-[16px] font-bold text-white uppercase">Enrolled Subjects</h1>
                     <h1 className="text-[10px] sm:text-[14px] font-bold text-yellow-400 uppercase whitespace-nowrap">{sem?.[0].semester + " | " + sem?.[0].acad_year}</h1>
                  </div>
                        
                        <div className="border border-slate-200 rounded-md overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="text-slate-900 text-left text-xs sm:text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                                    <tr className="bg-slate-50">
                                        <th className="px-4 py-3.5">COURSE CODE</th>
                                        <th className="px-4 py-3.5">DESCRIPTION</th>
                                        <th className="px-4 py-3.5">UNITS</th>
                                        <th className="px-4 py-3.5">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="text-[10px] sm:text-xs divide-y divide-slate-200">
                                    {subs.map((data) => (
                                        <tr key={data.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                {data.sub_code}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 min-w-[250px] uppercase">
                                                {data.sub_desc}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap uppercase">
                                                {data.units}
                                            </td>

                                            <td className={`px-4 py-4 whitespace-nowrap uppercase ${ data.status === "Enrolled" ? "text-green-900 font-bold" : "text-slate-500"}`}>
                                                {data.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>  
            </main>
         </div>
      </>
   );
}