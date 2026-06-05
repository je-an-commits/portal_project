import { Cone, History, NotebookPen } from "lucide-react";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Appointment() {
   const [loading, setLoading] = useState(false);
   const { api, user } = useAuth();
   const [ data, setData ] = useState("");
   const [ app, setApp] = useState([])
   const [ date, setDate ] = useState()
   const [ purpose, setPurpose ] = useState("");
   const [timeSlot, setTimeSlot] = useState("");
   const [other, setOther] = useState("");
   const others = purpose === "Others";
   const final = others ? other : purpose;
   const isValid =
               date &&
               timeSlot &&
               purpose &&
               (purpose !== "Others" || other);

   const formatLocalDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
   };
   const body = {
      date: date ? formatLocalDate(date) : null,
      time: timeSlot,
      purpose: final,
      id: user.id
   }

   useEffect(() => {
      fetchAppointments(   )
    }, [user]);

    const fetchAppointments = async () => {
      if (!user) return;

      const res = await api.get(`/student/appointment/${user.id}`);
      setApp(res.data.result);
   };

   const handeSubmit = async () => {
      setLoading(true);
      try{
         const res = await api.post("/student/appointment", body);
         toast.success("Your Booking has been submitted!");
         await fetchAppointments()
      }
      catch(err){
         const data = err.response?.data;
         if (data?.error) {
            toast.error(data.error, { position: "top-right"});
         } else {
            toast.error(data?.message || "Something went wrong", { position: "top-right"});
         }
      }
      
      setDate(undefined);
      setPurpose("");
      setTimeSlot("");
      setLoading(false);
   }

   return (
      <>
         <SideBar />

         <div className="flex-1 lg:ml-[264px]">
            <div className="sticky top-0 z-50 w-full">
               <HeadBar />
            </div>

            {/* Main Section */}
            <main className="mt-16 lg:mt-0 p-5 min-h-[calc(100vh_-_80px)] bg-gray-100">
               
               {/* Header */}
               <div className="flex justify-between">
                  <div>
                     <h1 className="font-black text-xl lg:text-2xl text-slate-700">
                        CAMPUS APPOINTMENTS
                     </h1>

                     <p className="text-gray-600 text-[12px] lg:text-[16px]">
                        Book your visit here.
                     </p>
                  </div>
               </div>

               <div className="grid lg:grid-cols-2 gap-5 mt-5">
                  <div>
                     <Card>
                        <CardHeader>
                           <CardTitle className="font-black flex gap-2 text-green-900"><NotebookPen /> Book a visit</CardTitle>
                           <CardDescription className="ml-8">
                              Fill out the details for your campus entry.
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <form action={handeSubmit}>
                              <FieldSet>
                              <FieldGroup>
                                 {/* DATE */}
                                 <Field>
                                    <FieldLabel>
                                       Select date <span className="text-red-700">*</span>
                                    </FieldLabel>
                                    <DatePicker date={date} setDate={setDate} />
                                 </Field>

                                 {/* TIME SLOT */}
                                 <Field>
                                    <FieldLabel>
                                    Time slot <span className="text-red-700">*</span>
                                    </FieldLabel>

                                    <Select 
                                       value={timeSlot}
                                       onValueChange={setTimeSlot}
                                       disabled={!date}
                                       required
                                    >
                                    <SelectTrigger className="w-full">
                                       <SelectValue
                                          placeholder={
                                          !date ? "Please select a date first" : "Select time slot..."
                                          }
                                       />
                                    </SelectTrigger>

                                    <SelectContent>
                                       <SelectGroup>
                                          <SelectItem value="8:00-9:00AM">8:00-9:00AM (15 Slots)</SelectItem>
                                          <SelectItem value="9:00-10:00AM">9:00-10:00AM (15 Slots)</SelectItem>
                                          <SelectItem value="10:00-11:00AM">10:00-11:00AM (15 Slots)</SelectItem>
                                          <SelectItem value="11:00-12:00PM">11:00-12:00PM (15 Slots)</SelectItem>
                                          <SelectItem value="1:30-2:30PM">1:30-2:30PM (15 Slots)</SelectItem>
                                          <SelectItem value="2:30-3:30PM">2:30-3:30PM (15 Slots)</SelectItem>
                                          <SelectItem value="3:30-4:30PM">3:30-4:30PM (15 Slots)</SelectItem>
                                       </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                 </Field>

                                 {/* PURPOSE */}
                                 <Field>
                                    <FieldLabel>
                                    Select purpose of visit <span className="text-red-700">*</span>
                                    </FieldLabel>

                                    <Select value={purpose} onValueChange={setPurpose} required>
                                    <SelectTrigger className="w-full">
                                       <SelectValue placeholder="Select your main purpose..." />
                                    </SelectTrigger>

                                    <SelectContent>
                                       <SelectGroup>
                                          <SelectItem value="Request COR">Request COR</SelectItem>
                                          <SelectItem value="Request COG">Request COG</SelectItem>
                                          <SelectItem value="Request Good Moral">Request Good Moral</SelectItem>
                                          <SelectItem value="Request Grade Checklist">Request Grade Checklist</SelectItem>
                                          <SelectItem value="CAV">CAV</SelectItem>
                                          <SelectItem value="Others">Others</SelectItem>
                                       </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                 </Field>

                                 {/* OTHERS INPUT (FIXED - OUTSIDE SELECT) */}
                                 {others && (
                                    <Field>
                                    <FieldLabel>
                                       Please specify <span className="text-red-700">*</span>
                                    </FieldLabel>

                                    <Input
                                       type="text"
                                       placeholder="e.g. Claim ID (Max 60 characters)"
                                       maxLength={60}
                                       onChange={(e) => setOther(e.target.value)}
                                    />
                                    </Field>
                                 )}

                              </FieldGroup>
                              {/* BUTTONS */}
                                 <Field className="pt-4 flex gap-3">
                                    <Button disabled={!isValid} type="submit" className="font-black bg-green-800 text-gray-100 p-5 hover:bg-green-900 cursor-pointer">
                                       {loading ? (
                                          <>
                                             <LoaderCircle
                                                size={18}
                                                className="animate-spin"
                                             />
                                             PROCESSING...
                                          </>
                                       ) : (
                                          "CONFIRM BOOKING"
                                       )}
                                    </Button>
                                    <Button
                                       className="font-bold cursor-pointer"
                                       type="button"
                                       variant="outline"
                                       onClick={() => {
                                          setDate(undefined);
                                          setPurpose("");
                                          setTimeSlot("");
                                       }}
                                    >
                                       CLEAR FIELDS
                                    </Button>
                                 </Field>
                              </FieldSet>
                           </form>
                        </CardContent>
                     </Card>
                  </div>

                  <div>
                     <Card className="relative max-h-[500px] overflow-y-auto py-0">
                        <CardHeader className="sticky top-0 bg-white z-10 p-5">
                           <CardTitle className="font-black flex justify-between gap-2 border-b border-gray-200 pb-4 ">
                              <div className=" flex gap-2">
                                 <History /> 
                                 Appointment History
                              </div>
                              <div className="text-sm text-muted-foreground">
                                    {!app ? "0 records" : app.length + " Records"}
                              </div>
                              
                           </CardTitle>
                        </CardHeader>
                        <CardContent >
                           {app.length === 0 ? (
                              <div className="flex items-center justify-center w-full h-[6.25rem]">
                                 No history yet.
                              </div>
                              ) : (
                              app.map((item) => (
                                 <Card key={item.id} className={`mb-5 ${item.status === "PENDING" ? "bg-orange-100" : ( item.status === "CONFIRMED" ? "bg-blue-100" : ( item.status === "REJECTED" ? "bg-red-100" : "bg-green-100"))}`}>
                                    <CardContent>
                                       <div className="flex justify-between">
                                          <div className="flex gap-5">
                                             <div className="flex flex-col justify-center items-center border bg-white">
                                                <p className="bg-red-600 px-2 font-bold text-white">{format(new Date(item.appointment_date), "MMMM")}</p>
                                                <p className="text-xl">{format(new Date(item.appointment_date), "d")}</p>
                                             </div>
                                             
                                 
                                             <div>
                                                <p>{format(new Date(item.appointment_date), "EEE") + " " +item.time_slot}</p>
                                                <p>{item.purpose}</p>
                                             </div>
                                             
                                             
                                          </div>
                                          <p>{item.status}</p>
                                          
                                       </div>
                                    
                                    </CardContent>
                                 </Card>
                              ))
                           )}
                        </CardContent>
                     </Card>
                  </div>
                  
               </div>

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