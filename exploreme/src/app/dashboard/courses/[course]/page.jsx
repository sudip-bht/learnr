"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DraggableCard from "@/components/DraggableCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCourse } from "@/app/services/api_services"; // Adjust the path as needed

const CreateCourse = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [courseName, setCourseName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateCourse = async () => {
    try {
      const response = await createCourse(playlistUrl);
      setSuccess("Course created successfully!");
      setShowDialog(false);
      setPlaylistUrl("");
      setCourseName("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      <h1>Create Course</h1>
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg w-full">
        <Input
          type="text"
          placeholder="Import from playlist ..."
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className="flex-1 border border-gray-500 outline-none bg-transparent text-gray-700 placeholder-gray-500 shadow-md focus-visible:ring-0"
        />
        <Button
          className="bg-blue-500 hover:bg-blue-800"
          onClick={handleCreateCourse}
        >
          Import
        </Button>
      </div>
      <p className="flex justify-center">or</p>
      <div className="flex justify-center">
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger className="bg-blue-500 text-white rounded-xl hover:bg-blue-800 w-[200px] p-3">
            Create course
          </DialogTrigger>
          <DialogContent className="bg-slate-200">
            <DialogHeader>
              <DialogTitle>Create Course</DialogTitle>
              <DialogDescription>
                Please enter the course name.
              </DialogDescription>
              <Input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="mt-2"
              />
            </DialogHeader>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button
                className="bg-blue-500 hover:bg-blue-800"
                onClick={handleCreateCourse}
              >
                Confirm
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DraggableCard />
      </div>
    </div>
  );
};

export default CreateCourse;
