"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0d0614] to-black text-white px-6 lg:px-20 py-14">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-wide flex items-center gap-2">
            {/* <span className="text-purple-500 text-3xl font-bold"></span> */}
            <span className="rounded-full h-8 w-8 bg-white block shrink-0" />
            Blog4u
          </h2>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 font-semibold">Legal</h3>
          <a href="#" className="text-white/80 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-white/80 hover:text-white">Terms of Service</a>
          <a href="#" className="text-white/80 hover:text-white">Partner Terms</a>
          <a href="#" className="text-white/80 hover:text-white">Service Level (SLA)</a>
          <a href="#" className="text-white/80 hover:text-white">Data Processing (DPA)</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 font-semibold">Navigation</h3>
          <a href="#features" className="text-white/80 hover:text-white">Features</a>
          <a href="#pricing" className="text-white/80 hover:text-white">Pricing</a>
          <a href="#about-us" className="text-white/80 hover:text-white">About Us</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 font-semibold">Contact Information</h3>
          <p className="text-white/80">
            Dehradun, Uttarakhand, India
          </p>
          <p className="text-white/80">support@blog4u.com</p>
        </div>

      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-white/60">
        <p>© {new Date().getFullYear()} Blog4u Corp. All rights reserved</p>
      </div>

    </footer>
  );
}