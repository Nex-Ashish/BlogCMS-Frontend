"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Image,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Posts",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      name: "Create Post",
      href: "/editor/create",
      icon: PlusSquare,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-80 bg-[linear-gradient(#0009,#9a3cd599_70%),linear-gradient(#000,#000)] border-r border-purple-900 flex flex-col">
      
      <div className="px-6 py-6 border-b border-purple-900">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Admin Panel
        </h2>
      </div>

      <nav className="flex flex-col gap-1 text-sm p-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}