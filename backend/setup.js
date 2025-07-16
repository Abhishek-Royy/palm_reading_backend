const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Check Python and OpenCV
try {
  const { execSync } = require('child_process');
  const pythonVersion = execSync('python --version').toString();
  console.log(`Python detected: ${pythonVersion}`);
  
  try {
    execSync('python -c "import cv2; print(\'OpenCV is installed\')"');
    console.log('OpenCV is installed');
  } catch (e) {
    console.error('OpenCV is not installed. Please run: pip install opencv-python');
  }
} catch (e) {
  console.error('Python is not installed or not in PATH');
}

console.log('Setup complete. Run "node index.js" to start the server.');