"use client";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("token");
    router.push("/admin");
  };

  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let title = "Dashboard";
  let subtitle = "Here’s what’s happening with your blog today.";

  if (pathname.includes("/posts")) {
    title = "Posts";
    subtitle = "Manage and organize your blog posts.";
  }

  if (pathname.includes("/create")) {
    title = "Create Post";
    subtitle = "Write and publish a new blog post.";
  }

  return (
    <nav className="w-full px-6 py-4 bg-[#0B0F1A] border-b border-white/10 flex items-center justify-between">
      
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        
        {/* <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-55">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white ml-2 w-full placeholder:text-gray-500"
          />
        </div> */}

        <div className="relative">
          <Bell className="w-5 h-5 text-gray-300 cursor-pointer" />
          {/* <span className="absolute -top-1 -right-1 bg-purple-600 text-xs w-4 h-4 flex items-center justify-center rounded-full text-white">
            3
          </span> */}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700 transition-all duration-200"
        >
          Logout
        </button>

        {/* <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300">
          {today}
          <ChevronDown className="w-4 h-4" />
        </div> */}

        {/* <Avatar className="w-8 h-8">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar> */}
      </div>
    </nav>
  );
}