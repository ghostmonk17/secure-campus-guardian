# Face Recognition API

This API provides face recognition capabilities for the Secure Campus Guardian application.

## Prerequisites

- Python 3.7+
- OpenCV with contrib modules
- Flask
- Flask-CORS

## Installation

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Running the API

1. Make sure your current directory is the `api` folder.
2. Run the Flask application:

```bash
python face_recognition_api.py
```

The API will start at `http://localhost:5000` by default.

## API Endpoints

### Recognize Face

- **URL**: `/api/recognize`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "image": "base64-encoded-image-data"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "student": {
      "id": 1,
      "name": "Student One",
      "program": "Computer Science",
      "year": "3rd Year",
      "status": "Active"
    },
    "confidence": 95.5
  }
  ```

## Integration with React Application

The React application will connect to this API when a user captures an image for face recognition. The image is sent as base64-encoded data to the API, which will process it using OpenCV and return the matching student information if found.

If the API is not running, the React application will fall back to using mock data for demonstration purposes. 