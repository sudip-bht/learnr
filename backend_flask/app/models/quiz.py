from app import db
from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
from datetime import datetime
from app.models.video import VideoSchema

# Define Quiz Schema using Marshmallow
class QuizSchema(Schema):
    question = fields.Str(required=True)
    options = fields.List(fields.Str(), required=True, validate=validate.Length(equal=4))  # 4 options
    answer = fields.Str(required=True)
    video_id = fields.Nested(VideoSchema,required=True)  # This will reference the associated video
    timestamp = fields.DateTime(dump_only=True)  # Auto-generated timestamp

# Quiz model with database interaction methods
class QuizModel:
    schema = QuizSchema()

    @staticmethod
    def find_by_id(quiz_id):
        if ObjectId.is_valid(quiz_id):
            return db.quizzes.find_one({"_id": ObjectId(quiz_id)})
        return None

    @staticmethod
    def find_by_video_id(video_id):
        if ObjectId.is_valid(video_id):
            return list(db.quizzes.find({"video_id": video_id}))
        return None

    @staticmethod
    def create_quiz(data):
        try:
            # Validate the incoming data
            validated_data = QuizModel.schema.load(data)
            # Add a timestamp
            validated_data['timestamp'] = datetime.utcnow()
            db.quizzes.insert_one(validated_data)
            return {"message": "Quiz created successfully!"}
        except ValidationError as err:
            return {"errors": err.messages}, 400

    @staticmethod
    def update_quiz(quiz_id, data):
        db.quizzes.update_one({"_id": ObjectId(quiz_id)}, {"$set": data})

    @staticmethod
    def delete_quiz(quiz_id):
        db.quizzes.delete_one({"_id": ObjectId(quiz_id)})
