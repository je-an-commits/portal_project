import { Cone } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";

export default function Course() {

   const datas = [
      { id: "DCIT 26", description: "Application Development and Emerging Technologies", units: "3", day: "Enrolled" },
      { id: "GNED 09", description: "Rizal: Life, Works and Writings", units: "3", day: "Enrolled" },
      { id: "ITEC 100", description: "Information Assurance and Security 2", units: "3", day: "Enrolled"},
      { id: "ITEC 101", description: "IT ELECTIVE 1 (Human Computer Interaction 2)", units: "3", day: "Enrolled" },
      { id: "ITEC 105", description: "Network Management", units: "3", day: "Enrolled" },
      { id: "ITEC 106", description: "IT ELECTIVE 2 (Web System and Technologies 2)", units: "3", day: "Enrolled" },
      { id: "ITEC 200A", description: "CAPSTONE PROJECT AND RESEARCH 1", units: "3", day: "Enrolled" }
   ];
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
                  <div className="flex align-center justify-between p-5 rounded-t-2xl bg-green-900">
                     <h1 className="text-[12px] lg:text-[16px] font-bold text-white uppercase">Enrolled Subjects</h1>
                     <h1 className="text-[12px] lg:text-[14px] font-bold text-yellow-400 uppercase">second semester | 2025-2026</h1>
                  </div>
                        
                        <div className="border border-slate-200 rounded-md overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="text-slate-900 text-left text-xs sm:text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                                    <tr className="bg-slate-50">
                                        <th className="px-4 py-3.5">CODE</th>
                                        <th className="px-4 py-3.5">DESCRIPTION</th>
                                        <th className="px-4 py-3.5">UNITS</th>
                                        <th className="px-4 py-3.5">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="text-[10px] sm:text-xs divide-y divide-slate-200">
                                    {datas.map((data) => (
                                        <tr key={data.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                {data.id}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 min-w-[250px]">
                                                {data.description}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.units}
                                            </td>

                                            <td className={`px-4 py-4 whitespace-nowrap ${ data.day === "Enrolled" ? "text-green-900 font-bold" : "text-slate-500"}`}>
                                                {data.day}
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