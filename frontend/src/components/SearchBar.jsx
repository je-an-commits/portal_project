import { Search } from "lucide-react";

export default function SearchBar() {

   return (
      <form className="max-w-xl mx-auto" role="search">
         <div
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
            <label htmlFor="search" className="sr-only">Search</label>
            <input type="search" id="search" placeholder="Search..." required
               className="text-sm text-slate-900  w-full outline-none" />

            <Search className="cursor-pointer" />
         </div>
      </form>
   );
};