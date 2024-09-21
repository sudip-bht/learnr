"use client"
import React from 'react'
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const enrollCourse = [
    {
      id: 1,
      img: "/machine-learning.jpg",
      topic: "Introduction to Machine Learning",
      createdby: "Manish",
    },
    {
      id: 2,
      img: "/study.jpg",
      topic: "Data Science Fundamentals",
      createdby: "Priya",
    },
    {
      id: 3,
      img: "/study.jpg",
      topic: "Web Development Bootcamp",
      createdby: "Ravi",
    },
    {
      id: 4,
      img: "/study.jpg",
      topic: "UI/UX Design Essentials",
      createdby: "Sneha",
    },
    {
      id: 5,
      img: "/study.jpg",
      topic: "Python Programming for Beginners",
      createdby: "Amit",
    },
    {
      id: 6,
      img: "/study.jpg",
      topic: "Cloud Computing Basics",
      createdby: "Riya",
    },
    {
      id: 7,
      img: "/study.jpg",
      topic: "Introduction to Cyber Security",
      createdby: "Karan",
    },
  ];  


const Courses = (course) => {
  const router = useRouter();
  return (
    <div className='flex flex-col space-y-5'>
      <h1>Courses</h1>
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg w-full">
      <Input
        type="text"
        placeholder="search for topic ..."
        className="flex-1 border border-gray-500 outline-none bg-transparent text-gray-700 placeholder-gray-500 shadow-md focus-visible:ring-0"
      />
      <Button className="bg-blue-500 hover:bg-blue-800">
        <Search className="h-5 w-5 text-white" />
      </Button>
      <Button 
        className="bg-blue-500 hover:bg-blue-800 flex items-center gap-3"
        onClick={()=>router.push(`/dashboard/courses/${course}`)}
      >
        Create course <PlusCircle />
      </Button>
    </div>
    <div className='flex gap-5 flex-wrap'>
    {
      enrollCourse.map((item)=>(
        <div 
        key={item.id}
        className='bg-slate-200 rounded-2xl p-5 flex flex-col space-y-2 items-center'
      >
        <div className='w-[300px] h-[300px]'>
          <Image
            src={item.img} 
            alt='courseimg'
            className='object-cover w-full h-full rounded-2xl'
            width={300}
            height={300}
          />
        </div>
        <div>
          <h1 className='text-base font-semibold'>{item.topic}</h1>
        </div>
        <div>
          <p>{item.createdby}</p>
        </div>
        <div>
          <Button className="bg-blue-500 hover:bg-blue-800 flex items-center gap-3">
            Enroll now
          </Button>
        </div>
      </div>      
      ))
    }
    </div>
    </div>
  )
}

export default Courses
