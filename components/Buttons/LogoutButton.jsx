"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";

export default function LogoutButton({ title, onClick }) {
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            // localStorage.removeItem("token");
            document.cookie = "token=; path=/; max-age=0"
        }
        router.push('/auth/login');
    }

    return (
        <div className="p-1 border border-white/50 rounded-full self-start">
            <button onClick={handleLogout} className="flex items-center gap-2.5 hover:bg-amber-200 cursor-pointer bg-white rounded-full text-[#111] text-sm font-medium border border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.3)] pl-5 pr-2.5 py-1.5" >
            {title}
            <span className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faArrowRight} className="text-white h-3 w-3" />
            </span>
            </button>
        </div>
    )
}