import os
import base64
import sys
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

# Add the Face directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'Face')))

# Path to the trained model and haarcascade
TRAINER_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'Face', 'trainer', 'trainer.yml'))
HAARCASCADE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'Face', 'haarcascade_frontalface_default.xml'))

# Enhanced student data for the three images in the dataset
student_data = {
    1: { 
        "id": 1, 
        "name": "John Davis", 
        "program": "Computer Science", 
        "year": "3rd Year", 
        "status": "Active",
        "studentId": "STU-10045",
        "gpa": "3.8",
        "email": "john.davis@university.edu",
        "enrollmentDate": "Sept 2021",
        "residenceHall": "North Campus"
    },
    2: { 
        "id": 2, 
        "name": "Emily Wong", 
        "program": "Electrical Engineering", 
        "year": "2nd Year", 
        "status": "Active",
        "studentId": "STU-10872",
        "gpa": "3.95",
        "email": "emily.wong@university.edu",
        "enrollmentDate": "Sept 2022",
        "residenceHall": "East Campus"
    },
    3: { 
        "id": 3, 
        "name": "Harshil Bohra", 
        "program": "Information Technology", 
        "year": "2nd Year", 
        "status": "Active",
        "studentId": "STU-09458",
        "gpa": "3.6",
        "email": "harshil.bohra@university.edu",
        "enrollmentDate": "Sept 2023",
        "residenceHall": "South Campus"
    }
}

def base64_to_image(base64_string):
    """Convert a base64 string to an image array."""
    # Remove the data URL prefix if present
    if 'data:image' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    # Decode the base64 string
    img_data = base64.b64decode(base64_string)
    img = Image.open(BytesIO(img_data))
    
    # Convert to numpy array for OpenCV
    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

def recognize_face(image):
    """Recognize a face in the given image."""
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Load the recognizer and face detector
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(TRAINER_PATH)
    face_cascade = cv2.CascadeClassifier(HAARCASCADE_PATH)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    
    if len(faces) == 0:
        return None, None
    
    # Process the first face found
    (x, y, w, h) = faces[0]
    face = gray[y:y+h, x:x+w]
    
    # Recognize the face
    try:
        label, confidence = recognizer.predict(face)
        confidence = round(100 - confidence, 2)  # Convert to percentage
        
        print(f"Recognized User ID: {label} with Confidence: {confidence}%")
        
        # Return the student data and confidence
        return label, confidence
    except Exception as e:
        print(f"Error during face recognition: {e}")
        return None, None

@app.route('/api/recognize', methods=['POST'])
def api_recognize_face():
    """API endpoint to recognize a face from a base64 image."""
    # Get the image data from the request
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400
    
    try:
        # Convert base64 to image
        image = base64_to_image(data['image'])
        
        # Recognize the face
        label, confidence = recognize_face(image)
        
        if label is not None and label in student_data:
            # Return the student data and confidence
            return jsonify({
                "success": True,
                "student": student_data[label],
                "confidence": confidence
            })
        else:
            return jsonify({
                "success": False,
                "message": "No match found or confidence too low"
            })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 