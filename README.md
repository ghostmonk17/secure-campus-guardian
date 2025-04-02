# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b7ee198f-a8af-41af-9a62-af973dcba034

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b7ee198f-a8af-41af-9a62-af973dcba034) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b7ee198f-a8af-41af-9a62-af973dcba034) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Face Recognition Feature

The Secure Campus Guardian application now includes a face recognition feature to identify students quickly. This feature uses OpenCV and Python for the backend processing.

### How it works:

1. Security personnel can access the face recognition feature from the Security Management page.
2. The feature captures images from the webcam and sends them to a Python API.
3. The API processes the images using OpenCV's face recognition capabilities.
4. If a match is found in the database, the student's information is displayed.

### Setup:

To use the face recognition feature, you need to run both the React application and the Python API:

1. Start the React application:
   ```bash
   cd secure-campus-guardian
   npm run dev
   ```

2. Start the Python API:
   ```bash
   cd secure-campus-guardian/api
   pip install -r requirements.txt
   python face_recognition_api.py
   ```

The API relies on pre-trained face data (trainer.yml) and the Haar cascade classifier from the Face folder.

### Demo Mode:

If the API is not running, the application will fall back to a demo mode using mock data to demonstrate the functionality.
