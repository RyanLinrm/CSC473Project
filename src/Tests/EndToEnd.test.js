const puppeteer = require('puppeteer');
try {
    (async () => {


        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 500,
            devtools: true,
        });
        const page = await browser.newPage();


        await page.goto('localhost:3000');
        await browser.close();

    })();
}
catch (e) {

}