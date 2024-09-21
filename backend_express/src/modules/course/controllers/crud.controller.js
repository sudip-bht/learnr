import { Course } from "../models/course.model.js";
import { User } from "../../user/model/user.model.js";
import { Video } from "../../video/model/video.model.js";
import { user } from "../../user/index.js";
// Function to create a course
export async function createCourse(req, res) {
  try {
    const userid = req.user.userId;
    const user = await User.findById(userid);

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const flaskResponse = await fetch(`http://127.0.0.1:5000/getPlaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: req.body.url }),
    });

    if (!flaskResponse.ok) {
      return res
        .status(400)
        .json({ message: "Failed to fetch videos from playlist." });
    }

    const flaskData = await flaskResponse.json();

    const videoIds = [];
    for (const videoData of flaskData.videos) {
      const newVideo = new Video({
        title: videoData.title,
        url: videoData.url,
        original_author: videoData.author,
        length: videoData.length,
      });
      await newVideo.save();
      videoIds.push(newVideo._id);
    }

    const course = new Course({
      title: flaskData.title,
      video_id: videoIds,
      created_by: userid,
    });
    await course.save();
    return res
      .status(201)
      .json({ message: "Course created successfully!", data: course });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Function to edit a course by ID
export async function editCourse(req, res) {
  const { courseId } = req.params;
  const data = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (data.created_by) {
      const user = await User.findById(data.created_by);
      if (!user) {
        return res.status(400).json({ message: "Creator does not exist." });
      }
    }

    Object.assign(course, data);
    await course.save();
    return res
      .status(200)
      .json({ message: "Course updated successfully!", data: course });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Function to delete a course by ID
export async function deleteCourse(req, res) {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
