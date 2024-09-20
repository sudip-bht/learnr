from flask import  jsonify
from app.models.user import UserModel

# Register a new user
def register_user(request):
    data = request.get_json()

    # Check if the email is already registered
    if UserModel.find_by_email(data['email']):
        return jsonify({"message": "Email already registered"}), 400

    # Create the user and handle validation errors
    result = UserModel.create_user(data)
    if "errors" in result:
        return jsonify(result), 400

    return jsonify(result), 201

# Login user
def login_user(request):
    data = request.get_json()

    # Find the user by email
    user = UserModel.find_by_email(data['email'])
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Verify the password
    if not UserModel.verify_password(user['password'], data['password']):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({"message": "Login successful!"}), 200
