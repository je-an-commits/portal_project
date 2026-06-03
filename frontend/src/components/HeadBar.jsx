import {
   ChevronDown,
   LogOut,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function HeadBar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }
    return(
        <>
            {/* Header */}
            <header className=" hidden lg:flex items-center justify-between shadow-sm bg-green-900 h-16 px-5">

                {/* Left Side */}
                <div className="w-full max-w-[400px]">
                    <SearchBar size={20} />
                </div>

                {/* Right Side */}
                <div className="relative group">
                    <div className="flex items-center gap-4 cursor-pointer hover:bg-green-800 px-3 py-2 rounded-md transition">
                        
                        <img
                            src="https://readymadeui.com/team-2.webp"
                            alt="User avatar"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />

                        <div>
                            <p className="text-sm text-gray-100 font-medium">
                                {user?.first_name + " " + user?.last_name}
                            </p>

                            <p className="text-xs text-yellow-500 mt-0.5">
                                {user?.student_id}
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
                            className="flex gap-2 w-full text-left px-4 py-3 text-red-600 cursor-pointer hover:bg-red-50 transition"
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