
import { CalendarCheck, Clock, Coffee, NotepadText, TicketCheck } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard() {
   const { user } = useAuth();
   const [ sem, setSem ] = useState([]);

   useEffect(() => {
    if(!user) return;
        const fetchData = async () => {
            const [resSem, resProg ] = await Promise.all([
                axios.get("https://heartbroken-mattie-cuter.ngrok-free.dev/student/semester"),
                axios.get(`https://heartbroken-mattie-cuter.ngrok-free.dev/student/program/${user.id}`, )
            ]) 
            setSem([
                resSem.data.semesters,
                resProg.data.prog
            ])
            sessionStorage.setItem("sem", JSON.stringify([resSem.data.semesters, resProg.data.prog]))
        };

        fetchData();
    }, [user]);

   return (
      <>
        <SideBar />

        <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
               <HeadBar />
            </div>
            {/* Main Section */}
            <main className="mt-15 lg:mt-0 flex flex-col lg:flex-row px-5 gap-5 py-10 min-h-[calc(100vh-80px)]">
                <div className="flex flex-col gap-5 lg:w-[70%]">
                    <div className="px-4 py-6 sm:px-8 sm:py-8 shadow-sm w-full rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-green-700">
                        <div className="border-b-1 border-green-600 pb-3 mb-5">
                            <h1 className="text-xl sm:text-3xl font-bold text-yellow-500">Welcome back!</h1>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-3xl font-black text-gray-200 uppercase">{user?.last_name + ", " + user?.first_name}</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 mt-5 bg-green-900/[0.5] rounded-xl p-5">
                            <div>
                                <h1 className="text-[12px] font-bold text-green-400">STUDENT NO.</h1>
                                <p className="text-2xl font-black text-yellow-500">{user?.student_id}</p>
                            </div>
                            <div>
                                <h1 className="text-[12px] font-bold text-green-400">ACADEMIC PROGRAM</h1>
                                <p className="text-sm lg:text-l font-black text-gray-200">{sem?.[1]?.program}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5">
                        
                        <div className="flex flex-col w-full items-center justify-center border border-green-900 p-4 sm:p-5 shadow-sm rounded-2xl">
                            <div className="flex justify-between w-full border-b border-green-900 pb-4 mb-5">
                                <h3 className="text-[16px] font-bold text-green-900">NEWS & UPDATES</h3>
                                <a href="" className="text-[12px] font-bold text-gray-500">SEE ALL</a>
                            </div>

                            <div className="flex px-5 items-center justify-center text-center">
                                <div className="p-2 w-10 h-10 shadow-sm  rounded-full">
                                    <NotepadText size={24} className="text-gray-300" />
                                </div> 
                            </div>
                            <p className="text-center text=[14px]">No recent announcements.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:w-[30%] gap-5">
                    <div className="flex flex-col text-center justify-center items-center shadow-sm rounded-2xl">
                        <h3 className="text-[12px] text-gray-200 rounded-t-2xl font-bold bg-yellow-600 w-full overflow-hidden py-4 sm:py-5">ACTIVE TERM</h3>
                        <div className="flex flex-col gap-2 p-5">
                            <h2 className="text-l font-bold text-slate-700">{sem?.[0]?.acad_year}</h2>
                            <h1 className="text-xl font-black text-green-900">{sem?.[0]?.semester}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col pb-3 w-full shadow-sm rounded-2xl">
                            <div className="flex flex-wrap gap-2 px-4 sm:px-5 text-[12px] sm:text-[14px] justify-between text-gray-700 rounded-t-2xl font-bold bg-green-100 w-full overflow-hidden py-4 sm:py-5 ">
                                <div className="flex gap-2 items-center">
                                    <Clock size={16} className="shrink-0" />
                                    <h3>TODAY'S CLASSES</h3>
                                </div>
                                <a href="" className="whitespace-nowrap">Full Schedule</a>
                            </div>
                            <div className="flex pt-5 justify-center text-center">
                                <div className="p-2 w-10 h-10 bg-green-100 rounded-full">
                                    <Coffee size={24} className="text-slate-300" />
                                </div> 
                            </div>
                            <p className="text-center text=[14px] text-slate-700 font-semibold">No classes for today.</p>
                        </div>

                        <div className="flex flex-col pb-3 w-full shadow-sm rounded-2xl">
                            <div className="flex flex-wrap gap-2 px-4 sm:px-5 text-[12px] sm:text-[14px] items-center justify-between text-gray-700 rounded-t-2xl font-bold bg-orange-100 w-full overflow-hidden py-4 sm:py-5 ">
                                <div className="flex gap-2 items-center">
                                    <CalendarCheck size={16} className="shrink-0" />
                                    <h3>RECENT APPOINTMENTS</h3>
                                </div>
                                <a href="" className="whitespace-nowrap">Manage</a>
                            </div>
                            <div className="flex pt-5 items-center justify-center text-center">
                                <div className="p-2 w-10 h-10 bg-yellow-100 rounded-full">
                                    <TicketCheck size={24} className="text-yellow-300" />
                                </div> 
                            </div>
                            <p className="text-center text-[13px] sm:text-[14px] text-slate-700 font-semibold px-4 sm:px-10">You have no upcoming appointments at the Registrar's Office.</p>
                            <button className="outline-none bg-green-900 text-gray-100 mx-auto py-1 px-4 my-2 rounded-4xl text-[12px] hover:bg-green-800 cursor-pointer transition" >
                                Book Appointment
                            </button>
                        </div>
                </div>
                
            </main>
      </div>
      </>
   );
}