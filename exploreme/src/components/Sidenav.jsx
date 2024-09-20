"use client"
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";
import { BookCopy, LayoutDashboard, TvMinimalPlay } from 'lucide-react';

const Sidenav = () => {
    const router = useRouter();
    const pathname = usePathname();
  
    const menuList = [
      {
        id: 1,
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        id: 2,
        name: "Courses",
        icon: BookCopy,
        path: "/dashboard/courses",
      },
      {
        id: 3,
        name: "Watchparty",
        icon: TvMinimalPlay,
        path: "/dashboard/watchparty",
      },
    ];
  return (
    <div className="bg-slate-100 rounded-tl-2xl w-[280px] min-h-screen p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <Image src="/edulogo.svg" alt="logo" width={50} height={50} />
        <h1 className="text-lg font-bold font-sans tracking-wider text-black">
          ExploreMe
        </h1>
      </div>
      <hr className="border-gray-300" />
      <div>
        {menuList.map((menu, index) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex cursor-pointer text-base gap-3 p-4 my-2 rounded-xl font-medium text-black hover:bg-slate-300 ${pathname == menu.path? "hover:bg-gray-100 ": ""}`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidenav
