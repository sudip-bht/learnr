"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shapes, PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import QuizMe from "@/components/Quizme";

const audioFiles = [
  {
    lang: "default",
    src: "/english_audio.wav",
  },
  {
    lang: "Nepali",
    src: "/nepali_audio.wav",
  },
];

export default function VideoPage() {
  const [selectedAudio, setSelectedAudio] = useState("default");
  const [timestamp, setTimestamp] = useState(0); // Initial timestamp set to 120 seconds
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Seek both video and audio to the initial timestamp on load
    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.contentWindow.postMessage(
        `{"event":"command","func":"seekTo","args":[${timestamp}, true]}`,
        "*"
      );
    }
    if (audioRef.current) {
      audioRef.current.currentTime = timestamp;
    }
  }, [timestamp]);

  const handleAudioChange = (event) => {
    const selectedOption = event.target.value;
    const selectedAudioFile = audioFiles.find(
      (audio) => audio.lang === selectedOption
    );
    if (selectedAudioFile && audioRef.current) {
      audioRef.current.src = selectedAudioFile.src;
      audioRef.current.load(); // Reload the audio element to apply the new source
    }
    setSelectedAudio(selectedOption);
  };

  const handleSeek = (event) => {
    const time = Number(event.target.value);
    setTimestamp(time);
    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.contentWindow.postMessage(
        `{"event":"command","func":"seekTo","args":[${time}, true]}`,
        "*"
      );
    }
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.contentWindow.postMessage(
        `{"event":"command","func":"playVideo","args":[]}`,
        "*"
      );
    }
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.contentWindow.postMessage(
        `{"event":"command","func":"pauseVideo","args":[]}`,
        "*"
      );
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[600px] item-center">
      <h1 className="pb-4 text-xl font-semibold text-blue-600">
        Learning Fractions
      </h1>
      <div className="w-4/5 h-4/5">
        <div className="w-full h-full">
          <iframe
            ref={videoRef}
            height={"100%"}
            width={"100%"}
            src={
              selectedAudio == "default"
                ? "https://www.youtube.com/embed/4PlkCiEXBQI?enablejsapi=1"
                : "https://www.youtube.com/embed/4PlkCiEXBQI?enablejsapi=1&mute=1"
            }
            onPause={() => setIsPlaying(false)}
          />
        </div>
        <div className="flex items-center gap-6 mt-5">
          <div className="hidden">
            {/* Audio Element */}
            <audio ref={audioRef} controls>
              <source src="/output_audio.wav" type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Button
                onClick={handlePlay}
                className="bg-green-700 p-3 w-[100px] rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-green-800 transition-all duration-500 flex items-center gap-2"
              >
                Play <PlayCircleIcon />
              </Button>
            </div>
            <div>
              <Button
                onClick={handlePause}
                className="bg-red-700 p-3 w-[100px] rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-red-800 transition-all duration-500 flex items-center gap-2"
              >
                Pause <PauseCircleIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold">Video Play Time</p>
            <Input
              type="number"
              value={timestamp}
              onChange={handleSeek}
              className="p-2 border rounded-xl w-[80px]"
              placeholder="Seek to (seconds)"
            />
          </div>
          <div>
            <Button className="bg-blue-500 p-3 rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500">
              Add translation
            </Button>
          </div>
          <select
            className="p-2 bg-slate-100 text-gray-700 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out hover:bg-slate-200"
            onChange={handleAudioChange}
          >
            {audioFiles.map((audio) => (
              <option
                className="text-gray-700 p-2 hover:bg-blue-100 focus:bg-blue-100 transition duration-200 ease-in-out"
                key={audio.lang}
                value={audio.lang}
              >
                {audio.lang}
              </option>
            ))}
          </select>
          <div>
            <Sheet>
              <SheetTrigger className="bg-black text-white p-2 w-[120px] rounded-xl hover:scale-x-105 hover:text-gray-200 transition-all duration-500">
                Quiz Me
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                  <SheetTitle className="text-2xl flex justify-center gap-4 items-center font-semibold text-blue-600 mb-4">QuizMe <Shapes /></SheetTitle>
                  <SheetDescription>
                    <QuizMe />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
