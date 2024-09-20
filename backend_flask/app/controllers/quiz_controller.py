from flask import request, jsonify
from app.models.quiz import QuizModel

# Function to create a quiz
def create_quiz(request):
    data = request.get_json()
    result = QuizModel.create_quiz(data)

    if isinstance(result, tuple):  # Check for validation errors
        return jsonify(result), 400

    return jsonify(result), 201

# Function to edit a quiz by ID
def edit_quiz(quiz_id,request):
    data = request.get_json()

    # Find the quiz by ID
    quiz = QuizModel.find_by_id(quiz_id)
    if not quiz:
        return jsonify({"message": "Quiz not found."}), 404

    # Update the quiz with the provided data
    QuizModel.update_quiz(quiz_id, data)
    return jsonify({"message": "Quiz updated successfully!"}), 200

# Function to delete a quiz by ID
def delete_quiz(quiz_id):
    quiz = QuizModel.find_by_id(quiz_id)
    if not quiz:
        return jsonify({"message": "Quiz not found."}), 404

    QuizModel.delete_quiz(quiz_id)
    return jsonify({"message": "Quiz deleted successfully!"}), 200

# Function to get quizzes by video ID
def get_quizzes_by_video(video_id):
    quizzes = QuizModel.find_by_video_id(video_id)
    if not quizzes:
        return jsonify({"message": "No quizzes found for this video."}), 404

    return jsonify({"quizzes": quizzes}), 200
