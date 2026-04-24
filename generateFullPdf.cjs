const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  console.log('Starting local dev server...');
  const npmCmd = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
  const server = spawn(npmCmd, ['run', 'dev'], { stdio: 'ignore', shell: true });
  
  // Wait for the server to fully start
  await new Promise(r => setTimeout(r, 6000));
  
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to simulate a desktop screen
    await page.setViewport({ width: 1200, height: 1080, deviceScaleFactor: 2 });
    
    console.log('Navigating to local server...');
    await page.goto('http://localhost:5173/?print=true', { waitUntil: 'networkidle0', timeout: 60000 });
    
    console.log('Waiting for initial animations...');
    await new Promise(r => setTimeout(r, 2000));
    
    // Smoothly scroll down to trigger all intersection observers / animations
    console.log('Scrolling to load all content...');
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));

    console.log('Generating PDF...');
    await page.pdf({ 
      path: 'Murali_Full_Portfolio.pdf', 
      format: 'A4', 
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    
    await browser.close();
    console.log('Successfully generated full portfolio PDF!');
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  } finally {
    console.log('Stopping server...');
    server.kill();
    process.exit(0);
  }
})();
