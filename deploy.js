import { execSync } from 'child_process';

process.env.PATH = `C:\\Program Files\\Git\\cmd;C:\\Program Files\\GitHub CLI;${process.env.PATH}`;

try {
  console.log("Building production dist...");
  execSync('npm run build', { stdio: 'inherit' });

  console.log("Deploying to gh-pages branch on GitHub...");
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  
  console.log("SUCCESSFULLY DEPLOYED TO GH-PAGES!");
} catch (error) {
  console.error("Deployment error:", error.message);
}
