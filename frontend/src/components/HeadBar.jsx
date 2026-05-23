import {
   ChevronDown,
   LogOut,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function HeadBar() {
    const navigate = useNavigate();

    function logout() {
        navigate("/")
    }
    return(
        <>
            {/* Header */}
            <header className=" hidden lg:flex items-center justify-between shadow-sm bg-green-900 h-16 px-5">

                {/* Left Side */}
                <div className="w-[400px]">
                    <SearchBar size={20} />
                </div>

                {/* Right Side */}
                <div className="relative group">
                    <div className="flex items-center gap-4 cursor-pointer hover:bg-green-800 px-3 py-2 rounded-md transition">
                        
                        <img
                            src="https://readymadeui.com/team-2.webp"
                            alt="User avatar"
                            className="w-10 h-10 rounded-md border-2 border-white"
                        />

                        <div>
                            <p className="text-sm text-gray-100 font-medium">
                                Jerico Andrei Abalos
                            </p>

                            <p className="text-xs text-yellow-500 mt-0.5">
                                202315112
                            </p>
                        </div>

                        <div className="text-white">
                            <ChevronDown size={18} />
                        </div>

                    </div>

                    {/* Dropdown */}
                    <div
                        className="
                            absolute top-16 right-0 w-44
                            bg-white rounded-md shadow-sm
                            opacity-0 invisible
                            group-hover:opacity-100
                            group-hover:visible
                            transition-all duration-200
                            overflow-hidden
                        "
                    >
                        
                        <button
                            onClick={logout}
                            className="flex gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                           <span className="flex justify-center p-1 font-bold"><LogOut size={16} /></span>
                            Logout
                        </button>
                    </div>

                </div>

            </header>
        </>
    );
}