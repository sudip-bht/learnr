"use client"
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, University } from 'lucide-react';

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
        name: "Material",
        icon: University,
        path: "/dashboard/material",
      },
      {
        id: 3,
        name: "Material",
        icon: University,
        path: "/dashboard/material",
      },
      {
        id: 4,
        name: "Material",
        icon: University,
        path: "/dashboard/material",
      },
    ];
  return (
    <div className="bg-purple-700 rounded-tl-2xl w-[280px] min-h-screen shadow-lg p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <Image src="/edulogo.svg" alt="logo" width={50} height={50} />
        <h1 className="text-lg font-bold font-sans tracking-wider text-white">
          ExploreMe
        </h1>
      </div>
      <hr className="border-gray-300" />
      <div>
        {menuList.map((menu, index) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex cursor-pointer text-base gap-3 p-4 my-2 rounded-xl font-medium text-white hover:bg-purple-500 ${pathname == menu.path? "bg-purple-700": ""}`}
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
