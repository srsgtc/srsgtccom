import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });

    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.message);
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2' });

    await browser.close();
})();
