"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCourseById } from "@/app/services/api_services";

const CourseDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        setError(error.message);
        router.push("/dashboard/courses");
      }
    };

    fetchCourse();
  }, [id, router]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-2xl font-semibold text-blue-500">{course.title}</h1>
      <div className="w-[400px] h-[400px]">
        <Image
          src={course.video_id[0].url} // Adjust this if you have an image URL
          alt={course.title}
          className="object-cover rounded-lg w-full h-full"
          width={400}
          height={400}
        />
      </div>
      <p className="text-lg">Created by: {course.original_author}</p>
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
        onClick={() => router.push("/dashboard/courses")}
      >
        Go Back to Courses
      </button>
    </div>
  );
};

export default CourseDetail;
