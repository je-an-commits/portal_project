
import { FileDown } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";

export default function Enrollment() {
const datas = [
      { id: "DCIT 26", description: "Application Development and Emerging Technologies", units: "3", day: "THU", time: "10:00 AM - 1:00 PM", room: "Comlab 1" },
      { id: "GNED 09", description: "Rizal: Life, Works and Writings", units: "3", day: "MON", time: "10:00 AM - 11:30 AM", room: "TMA 101" },
      { id: "ITEC 100", description: "Information Assurance and Security 2", units: "3", day: "SAT", time: "10:00 AM - 1:00 PM", room: "Comlab 1" },
      { id: "ITEC 101", description: "IT ELECTIVE 1 (Human Computer Interaction 2)", units: "3", day: "THU", time: "7:00 AM - 10:00 AM", room: "Comlab 2" },
      { id: "ITEC 105", description: "Network Management", units: "3", day: "SAT", time: "7:00 AM - 10:00 AM", room: "Comlab 2" },
      { id: "ITEC 106", description: "IT ELECTIVE 2 (Web System and Technologies 2)", units: "3", day: "THU", time: "1:30 PM - 4:30 PM", room: "Comlab 1" },
      { id: "ITEC 200A", description: "CAPSTONE PROJECT AND RESEARCH 1", units: "3", day: "TBA", time: "TBA", room: "TBA" }
   ];

   return (
      <>
        <SideBar />

        <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
                <HeadBar />
            </div>
            {/* Main Section */}

            <main className="mt-20 lg:mt-0 p-5 min-h-[calc(100vh-80px)]">
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-black text-l lg:text-2xl text-slate-700">
                            VIRTUAL REGISTRATION FORM
                        </h1>
                        <p className="text-gray-600 text-[12px] lg:text-[16px]">Manage your registration form here.</p>
                    </div>
                    <div>
                        <button className="flex gap-2 px-3 py-2 bg-red-700 rounded-2xl font-bold text-gray-200 text-[8px] lg:text-[12px]  cursor-pointer hover:bg-red-800"><span><FileDown className="w-3 h-3 lg:w-5 lg:h-5" /> </span>DOWNLOAD PDF</button>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-10 w-full overflow-x-hidden">
    
                    {/* FORM CONTAINER */}
                    <div className="w-full max-w-6xl mx-auto">
                        
                        {/* HEADER */}
                        <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-4 sm:gap-6 text-center">
                            <img
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                src="/logo.png"
                                alt=""
                            />

                            <div>
                                <h6 className="text-[9px] sm:text-[10px] uppercase">
                                    Republic of the Philippines
                                </h6>

                                <h6 className="text-[18px] sm:text-[24px] uppercase font-black text-green-900 leading-tight">
                                    CAVITE STATE UNIVERSITY
                                </h6>

                                <h6 className="text-[10px] sm:text-[12px] uppercase font-bold">
                                    Tanza Campus
                                </h6>
                            </div>

                            <img
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                src="https://tanza.cvsu.edu.ph/assets/img/cvsu-tanza-logo.png"
                                alt=""
                            />
                        </div>

                        {/* TITLE */}
                        <div className="text-center mt-2">
                            <h1 className="text-[16px] sm:text-[20px] font-bold text-green-900 underline uppercase">
                                Virtual Registration Form
                            </h1>
                        </div>

                        {/* INFO SECTIONS */}
                        <div className="space-y-2 mt-6">

                            {/* ROW 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Student Number
                                    </h5>
                                    <h5 className="text-sm">202315112</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Semester
                                    </h5>
                                    <h5 className="text-sm">Second Semester</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        School Year
                                    </h5>
                                    <h5 className="text-sm">2025-2026</h5>
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Student Name
                                    </h5>
                                    <h5 className="text-sm break-words">
                                        ABALOS, JERICO ANDREI
                                    </h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Encoder
                                    </h5>
                                    <h5 className="text-sm">E-COPY / SYSTEM</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Date
                                    </h5>
                                    <h5 className="text-sm break-words">
                                        Wednesday, 20 May 2026 | 11:58 PM
                                    </h5>
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Course & Year
                                    </h5>

                                    <h5 className="text-sm break-words">
                                        BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY - THIRD
                                    </h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Section
                                    </h5>
                                    <h5 className="text-sm">Two</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Major
                                    </h5>
                                    <h5 className="text-sm">N/A</h5>
                                </div>
                            </div>

                            {/* ROW 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Scholarship
                                    </h5>
                                    <h5 className="text-sm">RA 10931</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="font-bold text-green-900 text-[12px]">
                                        Total Units
                                    </h5>
                                    <h5 className="text-sm">21</h5>
                                </div>
                            </div>

                            {/* ROW 5 */}
                            <div className="py-5 border-b border-slate-300 uppercase">
                                <h5 className="font-bold text-green-900 text-[12px]">
                                    Address
                                </h5>

                                <h5 className="text-sm break-words">
                                    BLOCK 13 LOT 22 SECTION 1 PHASE 1 PABAHAY,
                                    BAGTAS, TANZA, CAVITE 4108
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="w-full max-w-6xl mx-auto mt-8">
                        <div className="border border-slate-200 rounded-md overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="text-slate-900 text-left text-xs sm:text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                                    <tr className="bg-slate-50">
                                        <th className="px-4 py-3.5">CODE</th>
                                        <th className="px-4 py-3.5">DESCRIPTION</th>
                                        <th className="px-4 py-3.5">UNITS</th>
                                        <th className="px-4 py-3.5">DAY</th>
                                        <th className="px-4 py-3.5">TIME</th>
                                        <th className="px-4 py-3.5">ROOM</th>
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

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.day}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.time}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.room}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
      </div>
      </>
   );
}