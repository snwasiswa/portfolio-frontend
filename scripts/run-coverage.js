const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

(async () => {
  const chromePath = puppeteer.executablePath();
  console.log('Using Chromium at:', chromePath);

  const cmd = `CHROME_BIN="${chromePath}" ng test --code-coverage --watch=false`;
  execSync(cmd, { stdio: 'inherit', shell: true });
})();
