"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCourses } from "@/app/services/api_services";

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-lg font-semibold text-blue-600">Courses</h1>
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
          onClick={() => router.push("/dashboard/create")}
        >
          Create course <PlusCircle />
        </Button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {courses.map((item) => (
          <div
            key={item.id}
            className="bg-slate-200 rounded-2xl p-5 flex flex-col space-y-2 items-center"
          >
            <div className="w-[300px] h-[300px]">
              <Image
                src={item.image_url}
                alt="courseimg"
                className="object-cover w-full h-full rounded-2xl"
                width={300}
                height={300}
              />
            </div>
            <div>
              <h1 className="text-base font-semibold">{item.title}</h1>
            </div>
            <div>
              <p>{item.created_by.name}</p>
            </div>
            <div>
              <Button
                className="bg-blue-500 hover:bg-blue-800 flex items-center gap-3"
                onClick={() => router.push(`/dashboard/courses/${item._id}`)}
              >
                Enroll now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
