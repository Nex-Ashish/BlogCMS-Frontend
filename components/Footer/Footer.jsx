"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0d0614] to-black text-white px-6 lg:px-20 py-14">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div className="flex flex-col gap-6">
          <Link href="/user" className="flex items-center gap-2 text-white">
            <div className="rounded-full h-8 w-8 overflow-hidden shrink-0">
              <Image src="https://images.pexels.com/photos/261719/pexels-photo-261719.jpeg" alt="Blog4u logo" width={32} height={32} className="object-cover object-center scale-150 w-full h-full" />
            </div>
            <span className="text-2xl font-semibold tracking-wide">Blog4u</span>
          </Link>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/ashish-panwarr" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://facebook.com/your-profile" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://x.com/panwar__ashish" target="_blank" rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 text-xl font-bold">Legal</h3>
          <a href="#" className="text-white/80 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-white/80 hover:text-white">Terms of Use</a>
          <a href="#" className="text-white/80 hover:text-white">Content Guidelines</a>
          <a href="#" className="text-white/80 hover:text-white">Copyright Policy</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 text-xl font-bold">Navigation</h3>
          <a href="/user/#features" className="text-white/80 hover:text-white">Features</a>
          <a href="/user/#blogs" className="text-white/80 hover:text-white">Blogs</a>
          <a href="/user/about" className="text-white/80 hover:text-white">About Us</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white/70 text-xl font-bold">Contact Information</h3>
          <p className="text-white/80">Dehradun, Uttarakhand, India</p>
          <p className="text-white/80">support@blog4u.com</p>
        </div>

      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-white/60">
        <p>© {new Date().getFullYear()} Blog4u Corp. All rights reserved</p>
      </div>

    </footer>
  );
}