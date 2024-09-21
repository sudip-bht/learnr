"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DraggableCard from '@/components/DraggableCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CreateCourse = () => {
  return (
    <div className='flex flex-col space-y-5'>
      <h1>Course</h1>
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg w-full">
      <Input
        type="text"
        placeholder="import from playlist ..."
        className="flex-1 border border-gray-500 outline-none bg-transparent text-gray-700 placeholder-gray-500 shadow-md focus-visible:ring-0"
      />
      <Button className="bg-blue-500 hover:bg-blue-800">
        Import
      </Button>
    </div>
    <p className='flex justify-center'>or</p>
    <div className='flex justify-center'>
    <Dialog>
  <DialogTrigger className="bg-blue-500 text-white rounded-xl hover:bg-blue-800 w-[200px] p-3">Create course</DialogTrigger>
  <DialogContent className="bg-slate-200">
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      </div>
      <div>
      <DraggableCard />
    </div>
    </div>
  )
}

export default CreateCourse
