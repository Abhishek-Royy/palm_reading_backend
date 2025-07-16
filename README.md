# Palm Reading App

This application analyzes palm images and provides a reading using AI.

## Project Structure

- `backend/`: Node.js Express server
  - `python/`: Python scripts for palm analysis
  - `uploads/`: Temporary storage for uploaded palm images

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make sure Python and OpenCV are installed:
   ```
   pip install opencv-python
   ```

4. Start the server:
   ```
   node index.js
   ```
   The server will run on http://localhost:5000

## Deployment

### GitHub

1. Create a new GitHub repository
2. Initialize Git in your project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Render

1. Sign up for a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node index.js`
   - Environment Variables: Add any necessary API keys

5. Deploy the service

## API Endpoints

- `GET /`: Health check endpoint
- `POST /upload`: Upload a palm image for analysis
- `GET /id/:id`: Example dynamic route