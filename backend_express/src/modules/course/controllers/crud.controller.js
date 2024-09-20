import { Course } from "../models/course.model.js";
import { User } from "../../user/model/user.model.js";

// Function to create a course
export async function createCourse(req, res) {
  try {
    const { created_by, ...courseData } = req.body;

    const user = await User.findById(created_by);
    console.log(user);
    console.log(created_by);
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const course = new Course({ ...courseData, created_by });
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
