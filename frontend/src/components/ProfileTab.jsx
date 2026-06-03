import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { BookUser, Contact, ShieldCheck, User, EyeOffIcon, EyeIcon, LoaderCircle } from "lucide-react"
import { useState } from "react";
import { Button } from "./ui/button"
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function TabsLine(props) {
  const [error, setError] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const date = new Date(props.info.birthdate);
  const formatted = date.toLocaleDateString();
   const { user, api } = useAuth();
   const [ currentPass, setCurrentPass ] = useState("");
  const [ newPass, setNewPass ] = useState("");
  const [ confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

   const handleNewPassword = async (e) => {
      e.preventDefault();
      setLoading(true)

      if(newPass !== confirmPass){
        toast.error("New password do not match!")
        setLoading(false)
        return;
      } 
      const data = {
         student_id: user.student_id,
         password: currentPass,
         newPassword: newPass
      }
      try{
         const res = await api.post("/auth/reset-password", data)
         toast.success(res.data.message);

          setLoading(false);
          setConfirmPass("")
          setCurrentPass("")
          setNewPass("")
      }catch(err){
         const data = err.response?.data;
          setLoading(false)
         if (data?.error) {
            toast.error(data.error, {position: "bottom-right"});
         } else {
            toast.error(data.message, {position: "bottom-right"});
         }
      }
     
   }

  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger  className="text-gray-500 hover:text-gray-900 hover:border-b-3 hover:border-b-gray-300 data-[state=active]:text-green-900 data-[state=active]:border-b-3 data-[state=active]:border-b-green-900" value="overview"><BookUser />Personal Details</TabsTrigger>
        <TabsTrigger className="text-gray-500 hover:text-gray-900 hover:border-b-3 hover:border-b-gray-300 data-[state=active]:text-green-900 data-[state=active]:border-b-3 data-[state=active]:border-b-green-900" value="reports"><ShieldCheck />Security</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="w-full border-1 border-gray-200 rounded-md mt-5">
            <div className="flex gap-2 px-5 py-4 bg-gray-200/[0.5] rounded-t-md font-black">
                <BookUser color="green" /> <h1 className="text-gray-700">ACADEMIC IDENTITY</h1>
            </div>

            <div className="flex items-center gap-5 p-5 bg-white rounded-b-md">
              <div className="max-w-[6.25rem] h-[6.25rem] border rounded-full flex items-center justify-center">
                {error ? (
                  <span className="text-center text-gray-500">
                    Image not available
                  </span>
                ) : (
                  <img
                    src="/image.jpg"
                    alt="Image not available"
                    className="w-full h-full object-cover"
                    onError={() => setError(true)}
                  />
                )}
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-50 ">
                <div className="flex flex-col gap-1">
                <h1 className="text-[10px] text-gray-500 font-bold">FULL NAME</h1>
                <p className="uppercase lg:text-[14px] font-bold">{props.user.last_name + ", " + props.user.first_name}</p>
              </div>
              <div className="flex flex-col gap-1 ">
                <h1 className="text-[10px] text-gray-500 font-bold">STUDENT NUMBER</h1>
                <p className="uppercase lg:text-[14px] font-bold">{props.user.student_id}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[10px] text-gray-500 font-bold">PROGRAM ENROLLED</h1>
                <p className="uppercase lg:text-[14px] font-bold">{props.info.program}</p>
              </div>
              </div>
            </div>
        </div>
        <div className="grid grid-cols lg:grid-cols-2 gap-5 w-full  rounded-md mt-5">
            <div className="w-full border-1 border-gray-200 rounded-md">
                <div className="flex gap-2 px-5 py-4 bg-gray-200/[0.5]  rounded-t-md font-black">
                  <User color="green" /> <h1 className="text-gray-700">PERSONAL DETAILS</h1>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-5 p-5 bg-white ">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[10px] text-gray-500 font-bold">BIRTHDATE</h1>
                    <p className="uppercase text-[14px] font-bold">{formatted}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[10px] text-gray-500 font-bold">SEX</h1>
                    <p className="uppercase text-[14px] font-bold">{props.info.sex}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[10px] text-gray-500 font-bold">CIVIL STATUS</h1>
                    <p className="uppercase text-[14px] font-bold">{props.info.civil_status}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[10px] text-gray-500 font-bold">RELIGION</h1>
                    <p className="uppercase text-[14px] font-bold">{props.info.religion}</p>
                  </div>
              </div>
              <div className="p-5 bg-white rounded-b-md">
                <div className="grid grid-cols-2 sm:grid-cols-3 border-t-1 border-t-gray-200 py-5 gap-3">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">DISABILITY (PWD)</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.disability}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">INDIGENOUS</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.indigenous}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">FIRST DEGREE</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.first_degree}</p>
                      </div>
                </div>
                      
              </div>
            </div>
            <div className="w-full">
                <div className="flex gap-2 px-5 py-4 bg-gray-200/[0.5] rounded-t-md font-black">
                  <Contact color="green" /> <h1 className="text-gray-700">CONTACT INFORMATION</h1>
              </div>
              <div className="p-5 bg-white rounded-b-md">
                <div className="grid grid-cols-1 gap-5">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">EMAIL ADDRESS</h1>
                        <p className="text-[14px] font-bold">{props.info.email}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">CURRENT ADDRESS</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.current_address}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">HOME ADDRESS</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.home_address}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">CONTACT NUMBER</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.contact}</p>
                      </div>
                </div>
                      
              </div>
            </div>
            <div className="w-full">
                <div className="flex gap-2 px-5 py-4 bg-red-200/[0.5] rounded-t-md font-black">
                  <BookUser color="red" /> <h1 className="text-red-600">EMERGENCY CONTACT</h1>
              </div>
              <div className="p-5 bg-white rounded-b-md">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">GUARDIAN'S NAME</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.guardian_name}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[10px] text-gray-500 font-bold">GUARDIAN'S CONTACT NO.</h1>
                        <p className="uppercase text-[14px] font-bold">{props.info.guardian_contact}</p>
                      </div>
                </div>
              </div>
            </div>
        </div>
        
      </TabsContent>

      <TabsContent value="reports">
        <div className="flex items-center justify-center w-full py-5">
            <Card className="w-full sm:min-w-100 max-w-md">
              <CardHeader>
                <CardTitle className="font-black">Security Settings</CardTitle>
                <CardDescription>
                  Ensure your account is using a strong password.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <form onSubmit={handleNewPassword}>
                <Field className="max-w-sm">
                  <FieldLabel htmlFor="inline-end-current">Current Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="inline-end-current"
                      type={showCurrent ? "text" : "password"}
                      value={currentPass}
                      placeholder="Enter current password"
                      onChange={(e) => setCurrentPass(e.target.value)}
                      required
                    />
                    <InputGroupAddon onClick={() => setShowCurrent(!showCurrent)} align="inline-end" className="cursor-pointer">
                      {showCurrent ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldLabel htmlFor="inline-end-new">New Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="inline-end-new"
                      type={showNew ? "text" : "password"}
                      value={newPass}
                      placeholder="Enter new password"
                      required
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <InputGroupAddon onClick={() => setShowNew(!showNew)} align="inline-end" className="cursor-pointer">
                      {showNew ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldLabel htmlFor="inline-end-confirm">Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="inline-end-confirm"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPass}
                      placeholder="Confirm new password"
                      required
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <InputGroupAddon onClick={() => setShowConfirm(!showConfirm)} align="inline-end" className="cursor-pointer">
                      {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <div className="flex mt-5">
                    <Button type="submit" className="bg-green-800 text-white w-full cursor-pointer hover:bg-green-900 hover:text-gray-100" variant="outline">
                      {loading ? (
                           <>
                              <LoaderCircle
                                 size={18}
                                 className="animate-spin"
                              />
                              Updating...
                           </>
                        ) : (
                           "Update Password"
                        )}
                      </Button>
                </div>
                </form>
              </CardContent>
            </Card>
        </div>
        
      </TabsContent>
    </Tabs>
  )
}
