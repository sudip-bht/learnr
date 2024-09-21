import { Quiz } from "../models/quiz.model.js";

// Function to create a quiz
export const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    const newQuiz = new Quiz(quizData);
    const savedQuiz = await newQuiz.save();
    return res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: savedQuiz });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Function to edit a quiz by ID
export const editQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const updatedData = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedData, {
      new: true,
    });
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res
      .status(200)
      .json({ message: "Quiz updated successfully!", quiz: updatedQuiz });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Function to delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
