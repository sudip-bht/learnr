import Sidenav from "@/components/Sidenav";

export default function layout({ children }) {
  return (
    <div className='flex justify-between min-h-screen p-5 pb-0 z-20 w-full'>
            <div className='flex ml-5'>
                <Sidenav />
            </div>
            <div className='mr-5 w-full ml-8'>
                {children}
            </div>
        </div>
  );
}
