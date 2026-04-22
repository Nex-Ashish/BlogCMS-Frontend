"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faX, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import LoginButton from "../Buttons/LoginButton";
import ContactButton from "../Buttons/ContactButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#about-us" },
];

export default function Header() {
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);

  return (
    <header className="w-full px-4 py-3 lg:py-2 lg:px-20  bg-[url('https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/698670b83b556e639fe91d39_Hero%20section%20(1).avif')] bg-cover bg-center">
        <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2 text-white">
            <span className="rounded-full h-8 w-8 bg-white block shrink-0" />
            <span className="text-2xl font-semibold tracking-wide">Blog4u</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8 lg:gap-16">
            {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} className="text-white/70 text-lg font-medium hover:opacity-70 transition-opacity">
                {item.label}
                </a>
            ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
            <LoginButton title="Login" onClick={() => {}} />
            <ContactButton title="Contact us" onClick={() => {}} />
            </div>

            <button
            onClick={() => setOpenHeaderMenu(!openHeaderMenu)}
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full border border-white/30 bg-white/10 text-white"
            >
            <FontAwesomeIcon icon={openHeaderMenu ? faX : faBars} className="h-4 w-4" />
            </button>
        </div>

        {openHeaderMenu && (
            <div className="lg:hidden bg-black/95 px-5 pb-6">
            <nav className="flex flex-col">
                {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} className="flex items-center justify-between py-4 text-white text-sm font-medium border-b border-white/10">
                    {item.label}
                    <FontAwesomeIcon icon={faAngleRight} className="h-3.5 w-3.5 text-white/40" />
                </a>
                ))}
            </nav>

            <div className="flex items-center gap-3 pt-5">
                <LoginButton title="Login" onClick={() => {}} />
                <ContactButton title="Contact us" onClick={() => {}} />
            </div>
            </div>
        )}
    </header>
  );
}