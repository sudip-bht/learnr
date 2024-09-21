from flask import request, jsonify
from bson import ObjectId
from app.models.video import VideoModel

# Function to create a video
def create_video(request):
    data = request.get_json()

    result = VideoModel.create_video(data)
    if isinstance(result, tuple):  # Check for validation errors
        return jsonify(result), 400

    return jsonify(result), 201

# Function to edit a video by ID
def edit_video(video_id,request):
    data = request.get_json()

    # Find the video by ID
    video = VideoModel.find_by_id(video_id)
    if not video:
        return jsonify({"message": "Video not found."}), 404

    # Update the video with the provided data
    updated_data = {key: value for key, value in data.items() if key in ['title', 'url', 'description']}

    # Update video in the database
    VideoModel.update_video(video_id, updated_data)
    return jsonify({"message": "Video updated successfully!"}), 200

# Function to delete a video by ID
def delete_video(video_id):
    video = VideoModel.find_by_id(video_id)
    if not video:
        return jsonify({"message": "Video not found."}), 404

    VideoModel.delete_video(video_id)
    return jsonify({"message": "Video deleted successfully!"}), 200
