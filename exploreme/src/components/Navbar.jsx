"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { useRouter, usePathname  } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  return (
    <div className="p-4 sticky top-0 shadow-sm bg-purple-600 border-b-2 z-20">
      <div className='flex justify-around'>
        <div 
          className='flex items-center gap-3 cursor-pointer'
          onClick={()=>router.push("/")}
        >
          <Image 
            className='w-8 h-8 object-contain'
            src="/edulogo.svg"
            width={30}
            height={30}
          />
          <h1 className='text-base text-white font-semibold tracking-wider'>ExploreMe</h1>
        </div>
        <div>
        {pathname !== "/login" && pathname !== "/signup" && (
          <Button
            className="bg-purple-950 p-5 rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-purple-800 transition-all duration-500"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
