const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Git Initialization Helper for Palm Reading App\n');

rl.question('Enter your GitHub repository URL: ', (repoUrl) => {
  try {
    // Check if .git directory exists
    if (fs.existsSync('.git')) {
      console.log('Git repository already initialized.');
    } else {
      console.log('\nInitializing Git repository...');
      execSync('git init');
    }

    console.log('\nAdding files to Git...');
    execSync('git add .');
    
    console.log('\nCommitting files...');
    execSync('git commit -m "Initial commit"');
    
    console.log('\nSetting main branch...');
    execSync('git branch -M main');
    
    console.log(`\nAdding remote origin: ${repoUrl}`);
    try {
      execSync('git remote remove origin');
    } catch (e) {
      // Origin doesn't exist yet, which is fine
    }
    execSync(`git remote add origin ${repoUrl}`);
    
    console.log('\nPushing to GitHub...');
    execSync('git push -u origin main');
    
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log('\nNext steps:');
    console.log('1. Go to Render.com and create a new Web Service');
    console.log('2. Connect your GitHub repository');
    console.log('3. Use the following settings:');
    console.log('   - Build Command: cd backend && npm install && pip install -r requirements.txt');
    console.log('   - Start Command: cd backend && node index.js');
    console.log('\nYour Palm Reading app will be deployed! 🎉');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nPlease make sure Git is installed and you have the correct permissions.');
  }
  
  rl.close();
});