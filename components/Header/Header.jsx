"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faX, faAngleRight, faUser, faChevronDown, faRightFromBracket, faGear, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../Buttons/LoginButton";
import ContactButton from "../Buttons/ContactButton";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "/user/#features" },
  { label: "Blogs", href: "/user/#blogs" },
  { label: "About Us", href: "/user/about" },
];

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // const userId = typeof window !== "undefined" ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id : null;
  const userId = typeof window !== "undefined" ? JSON.parse(atob(document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1].split(".")[1])).id : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} className="flex cursor-pointer items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-200" >
            <span className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faUser} className="text-white h-3.5 w-3.5" />
            </span>
            <span className="text-white text-sm font-medium hidden lg:block">My Profile</span>
            <FontAwesomeIcon icon={faChevronDown} className={`text-white/60 h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
            <div className="absolute right-0  mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">

            <button
                onClick={() => { router.push("/user/profile"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
            >
                <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                View Profile
            </button>

            
            <button
                onClick={() => { router.push(`/user/viewBlog?userId=${userId}`); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
            >
                <FontAwesomeIcon icon={faNewspaper} className="h-3.5 w-3.5" />
                View Blogs
            </button>

            <div className="border-t border-slate-100">
                <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
                >
                <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                Logout
                </button>
            </div>
            </div>
        )}
    </div>
  );
}

export default function Header() {
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState()
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // const stored = localStorage.getItem("token");
    const stored = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1]
    setToken(stored);
    if (stored) {
      const payload = JSON.parse(atob(stored.split(".")[1]));
      // console.log(payload,'ppp');
      setUserId(payload?.id);
    } 
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token"); 
    document.cookie = "token=; path=/; max-age=0";
    setToken(null);
    router.push("/");
  };

  return (
    <header className="w-full px-4 py-3 lg:py-2 lg:px-20 bg-[url('https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/698670b83b556e639fe91d39_Hero%20section%20(1).avif')] bg-cover bg-center">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/user" className="flex items-center gap-2 text-white">
          <div className="rounded-full h-8 w-8 overflow-hidden shrink-0">
            <Image src="https://images.pexels.com/photos/261719/pexels-photo-261719.jpeg" alt="Blog4u logo" width={32} height={32} className="object-cover object-center scale-150 w-full h-full" />
          </div>
          <span className="text-2xl font-semibold tracking-wide">Blog4u</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 lg:gap-16">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className="text-white/70 text-lg font-medium hover:opacity-70 transition-opacity">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {token ? (
            <ProfileDropdown onLogout={handleLogout} />
          ) : (
            <>
              <ContactButton title="Contact us" />
              <LoginButton title="Login" />
            </>
          )}
        </div>

        <button onClick={() => setOpenHeaderMenu(!openHeaderMenu)} className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full border border-white/30 bg-white/10 text-white" >
          <FontAwesomeIcon icon={openHeaderMenu ? faX : faBars} className="h-4 w-4" />
        </button>
      </div>

      {openHeaderMenu && (
        <div className="lg:hidden bg-black/95 px-5 pb-6">
          <nav className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href}
                onClick={() => setOpenHeaderMenu(false)}
                className="flex items-center justify-between py-4 text-white text-sm font-medium border-b border-white/10">
                {item.label}
                <FontAwesomeIcon icon={faAngleRight} className="h-3.5 w-3.5 text-white/40" />
              </a>
            ))}

            {token && (
              <>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-between py-4 text-white text-sm font-medium border-b border-white/10 w-full"
                >
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5 text-white/60" />
                    View Profile
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 text-white/40 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div className="flex flex-col pl-4 border-b border-white/10">
                    <button onClick={() => { router.push("/user/profile"); setOpenHeaderMenu(false); setProfileOpen(false); }}
                      className="flex items-center gap-2 py-3 text-white/70 text-sm">
                      <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                      My Profile
                    </button>
                    <button onClick={() => { router.push(`/user/viewBlog?userId=${userId}`); setOpenHeaderMenu(false); setProfileOpen(false); }}
                      className="flex items-center gap-2 py-3 text-white/70 text-sm">
                      <FontAwesomeIcon icon={faNewspaper} className="h-3.5 w-3.5" />
                      View Blogs
                    </button>
                    <button onClick={() => { handleLogout(); setOpenHeaderMenu(false); }}
                      className="flex items-center gap-2 py-3 text-red-400 text-sm">
                      <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </nav>

          {!token && (
            <div className="flex items-center gap-3 pt-5">
              <LoginButton title="Login" />
              <ContactButton title="Contact us" />
            </div>
          )}
        </div>
      )}
    </header>
  );
}