"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton({ title = "Login" }) {
    const router = useRouter();

    // const token = localStorage.getItem("token");
    const [token, setToken] = useState(null)
    useEffect(() => {
        const t = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1]
        setToken(t || null)
    }, [])

    const isLoggedIn = !!token;

    const handleClick = () => {
        if (isLoggedIn) {
            router.push('/user/createBlog')
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <div className="p-1 border border-white/50 rounded-full self-start">
            <button
                onClick={handleClick}
                className="flex items-center gap-2.5 hover:bg-amber-300 cursor-pointer bg-white rounded-full text-[#111] text-sm font-medium border border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.3)] pl-5 pr-2.5 py-1.5"
            >
                {isLoggedIn ? title : title}
                <span className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={isLoggedIn ? faArrowRight : faArrowRight} className="text-white h-3 w-3" />
                </span>
            </button>
        </div>
    );
}