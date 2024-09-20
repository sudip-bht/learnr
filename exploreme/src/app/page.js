"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-around w-full items-center min-h-screen">
      <div>
        <h1>Explore Me</h1>
      </div>
      <div>
        <Image 
            className='object-contain w-[300px]'
            src="/study.jpg"
            width={1000}
            height={1000}
          />
      </div>
    </div>
  );
}
