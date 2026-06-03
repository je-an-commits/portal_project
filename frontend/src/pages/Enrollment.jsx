
import { FileDown } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Enrollment() {
    const { user, api } = useAuth();
    const [dateTime, setDateTime] = useState('');
    const [ sem, setSem ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [subs, setSubs] = useState([])

    const totalUnits = subs.reduce(
        (sum, subject) => sum + subject.units,
        0
    );
    
    useEffect(() => {
        if(!user) return;
        const fetchData = async () => {
            const resSem = await api.get("/student/semester");

            const semester = resSem.data.semesters;

            setSem(semester);

            const [resSubs, resInfo] = await Promise.all([
                api.get(
                    `/student/subjects/${user.id}/${semester.semester}/${semester.acad_year}`
                ),
                api.get(`/student/info/${user.id}`),
            ]);

            setInfo(resInfo.data.user);
            setSubs(resSubs.data.subjects);
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        const formatDateTime = () => {
        const now = new Date();

        // Formats to: Wednesday, 20 May 2026
        const dateOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const datePart = new Intl.DateTimeFormat('en-GB', dateOptions).format(now);

        // Formats to: 11:58 PM
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const timePart = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

        // Combine parts with the separator
        setDateTime(`${datePart} | ${timePart}`);
        };

        // Run immediately on mount
        formatDateTime();

        // Update every minute
        const timer = setInterval(formatDateTime, 60000);

        return () => clearInterval(timer);
    }, []);

   return (
      <>
        <SideBar />

        <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
                <HeadBar />
            </div>
            {/* Main Section */}

            <main className="mt-16 lg:mt-0 p-5 min-h-[calc(100vh_-_80px)]">
                <div className="flex flex-col gap-4 lg:flex-row justify-between">
                    <div>
                        <h1 className="font-black text-lg lg:text-2xl text-slate-700">
                            VIRTUAL REGISTRATION FORM
                        </h1>
                        <p className="text-gray-600 text-[12px] lg:text-[16px]">Manage your registration form here.</p>
                    </div>
                    <div className="w-full sm:w-auto">
                        <button className="flex w-full justify-center gap-2 px-3 py-2 bg-red-700 rounded-md lg:rounded-2xl font-bold text-gray-200 text-[14px] lg:text-[12px] cursor-pointer hover:bg-red-800"><span><FileDown className="w-6 h-6 lg:w-5 lg:h-5" /> </span>DOWNLOAD PDF</button>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-10 w-full overflow-x-hidden">
    
                    {/* FORM CONTAINER */}
                    <div className="w-full max-w-6xl mx-auto">
                        
                        {/* HEADER */}
                        <div className="flex flex-row items-center justify-center p-4 gap-4 sm:gap-6 text-center">
                            <img
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                src="/logo.png"
                                alt=""
                            />

                            <div>
                                <h6 className="text-[9px] lg:text-[10px] uppercase">
                                    Republic of the Philippines
                                </h6>

                                <h6 className="text-[16px] lg:text-[24px] uppercase font-black text-green-900 leading-tight">
                                    CAVITE STATE UNIVERSITY
                                </h6>

                                <h6 className="text-[10px] lg:text-[12px] uppercase font-bold">
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 font-bold border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Student Number
                                    </h5>
                                    <h5 className="text-sm">{user?.student_id}</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Semester
                                    </h5>
                                    <h5 className="text-sm">{sem.semester}</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        School Year
                                    </h5>
                                    <h5 className="text-sm">{sem?.acad_year}</h5>
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 font-bold border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Student Name
                                    </h5>
                                    <h5 className="text-sm break-words">
                                        {user?.last_name + ", " + user?.first_name}
                                    </h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Encoder
                                    </h5>
                                    <h5 className="text-sm">E-COPY / SYSTEM</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Date
                                    </h5>
                                    <h5 className="text-sm break-words">
                                        {dateTime}
                                    </h5>
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 font-bold border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Course & Year
                                    </h5>

                                    <h5 className="text-sm break-words">
                                        {info?.program + " - " + info?.year_level }
                                    </h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Section
                                    </h5>
                                    <h5 className="text-sm">{info?.section}</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Major
                                    </h5>
                                    <h5 className="text-sm">N/A</h5>
                                </div>
                            </div>

                            {/* ROW 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 font-bold border-b border-slate-300">
                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Scholarship
                                    </h5>
                                    <h5 className="text-sm">RA 10931</h5>
                                </div>

                                <div className="uppercase">
                                    <h5 className="text-green-900 text-[12px]">
                                        Total Units
                                    </h5>
                                    <h5 className="text-sm">{totalUnits}</h5>
                                </div>
                            </div>

                            {/* ROW 5 */}
                            <div className="py-5 border-b border-slate-300 font-bold uppercase">
                                <h5 className="text-green-900 text-[12px]">
                                    Address
                                </h5>

                                <h5 className="text-sm break-words">
                                    {info?.current_address}
                                </h5>
                            </div>
                        </div>
                    </div>


                    {/* TABLE */}
                    <div className="w-full max-w-6xl mx-auto mt-8">
                        <h1 className="text-[16px] sm:text-[20px] font-bold text-green-900 mb-5 w-full text-center underline uppercase">Subjects</h1>
                        <div className="border border-slate-200 rounded-md overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="text-slate-900 text-left text-xs sm:text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                                    <tr className="bg-slate-50">
                                        <th className="px-4 py-3.5">COURSE CODE</th>
                                        <th className="px-4 py-3.5">DESCRIPTION</th>
                                        <th className="px-4 py-3.5">UNITS</th>
                                        <th className="px-4 py-3.5">DAY</th>
                                        <th className="px-4 py-3.5">TIME</th>
                                        <th className="px-4 py-3.5">ROOM</th>
                                    </tr>
                                </thead>

                                <tbody className="text-[10px] sm:text-xs divide-y divide-slate-200">
                                    {subs?.map((data) => (
                                        <tr key={data.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                {data.sub_code}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 min-w-[250px] uppercase">
                                                {data.sub_desc}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.units}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.sub_day}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                                                {data.sub_time}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 whitespace-nowrap uppercase">
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