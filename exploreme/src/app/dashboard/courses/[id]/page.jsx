// 
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const enrollCourse = [
    { id: 1, img: "/machine-learning.jpg", topic: "Introduction to Machine Learning", createdby: "Manish" },
    { id: 2, img: "/study.jpg", topic: "Data Science Fundamentals", createdby: "Priya" },
    { id: 3, img: "/study.jpg", topic: "Web Development Bootcamp", createdby: "Ravi" },
    { id: 4, img: "/study.jpg", topic: "UI/UX Design Essentials", createdby: "Sneha" },
    { id: 5, img: "/study.jpg", topic: "Python Programming for Beginners", createdby: "Amit" },
    { id: 6, img: "/study.jpg", topic: "Cloud Computing Basics", createdby: "Riya" },
    { id: 7, img: "/study.jpg", topic: "Introduction to Cyber Security", createdby: "Karan" },
];

const CourseDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  // Find the course based on the id in the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseData = enrollCourse.find((course) => course.id === parseInt(id));
    if (!courseData) {
      router.push('/dashboard/courses'); // If course is not found, redirect
    } else {
      setCourse(courseData);
    }
  }, [id, router]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-2xl font-semibold">{course.topic}</h1>
      <div className='w-[400px] h-[400px]'>
        <Image src={course.img} alt={course.topic} className="object-cover rounded-lg w-full h-full" width={400} height={400} />
      </div>
      <p className="text-lg">Created by: {course.createdby}</p>
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
        onClick={() => router.push('/dashboard/courses')}
      >
        Go Back to Courses
      </button>
    </div>
  );
};

export default CourseDetail;
