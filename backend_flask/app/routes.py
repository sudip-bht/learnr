# app/routes.py
from flask import Blueprint, request, jsonify
import os
from .utils import process_pdf, ask_question

main = Blueprint('main', __name__)

# Route to upload a PDF and process it
@main.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    return process_pdf(request)

# Route to ask questions based on the processed document
@main.route('/ask', methods=['POST'])
def ask():
    return ask_question(request)
