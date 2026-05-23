import { useState } from "react";
import { Lock, Eye, EyeOff, User, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

   const dummyAcc = {
      studID: '202315112',
      pass: '12345'
   }

   const handleLogin = (e) => {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
         if (
            username === dummyAcc.studID &&
            password === dummyAcc.pass
         ) {
            navigate("/dashboard");
         } else {
            alert("Invalid Credentials");
         }
         setLoading(false);
      }, 2000)
      
   };

   return (
      <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
         <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md w-full">
               <a href="#"><img src="https://tanza.cvsu.edu.ph/assets/img/cvsu-tanza-logo.png" alt="logo"
                  className="w-25 min-h-20 mb-8 mx-auto block" />
               </a>
               

               <div
                  className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
                  <h1 className="text-slate-900 text-center text-3xl font-bold dark:text-slate-50">STUDENT PORTAL</h1>

                  <form className="space-y-6 mt-10" onSubmit={handleLogin}>
                     <div>
                        <label htmlFor="username"
                           className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">STUDENT NUMBER</label>
                        <div className="relative group">
                           <User
                              size={18}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors"
                           />
                           <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter student number" required
                              className="px-3 py-2.5 pl-10 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-green-800 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                        >
                           PASSWORD
                        </label>

                        <div className="relative group">

                           {/* Lock Icon */}
                           <Lock
                              size={18}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors"
                           />

                           {/* Input */}
                           <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="••••••••"
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="px-3 py-2.5 pl-10 pr-10 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-green-800 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600 "
                           />

                           {/* Eye Icon */}
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
                           >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>

                        </div>
                     </div>

                     <div className="flex items-start flex-wrap gap-2">
                        <label className="flex items-center group has-[input:checked]:text-slate-900">
                           <input id="remember" name="remember" type="checkbox" className="sr-only" />
                           {/* Custom box */}
                           <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600
                                 bg-white dark:bg-neutral-700
                                 group-has-[input:checked]:bg-blue-600
                                 group-has-[input:checked]:outline-blue-600
                                 group-focus-within:outline-2
                                 group-focus-within:outline-blue-600" aria-hidden="true">
                              {/* Checkmark */}
                              <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                                 viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 5l3 3 7-7" />
                              </svg>
                           </span>
                           <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                              Remember me
                           </span>
                        </label>
                     </div>

                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-green-900 font-bold py-2.5 text-white hover:bg-green-800 cursor-pointer transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                     >
                        {loading ? (
                           <>
                              <LoaderCircle
                                 size={18}
                                 className="animate-spin"
                              />
                              AUTHENTICATING...
                           </>
                        ) : (
                           "LOGIN"
                        )}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </main>
   );
}