const puppeteer = require('puppeteer');
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';

test("Should show the correct game page",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.close();
    
});



test("Should open the single player scene correctly",async()=>{
jest.setTimeout(1000000);
const browser =await puppeteer.launch({
    headless:false,
    slowMo:80,
    args:['--window-size=1920,1080']
});
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    //the name after click is the name for button found from DOM
    await page.click('button.col-md-2.btn.btn-success');
    await page.close();

});

test("Should open the multiplayer scene correctly",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.click('button.col-md-2.btn.btn-primary');
    await page.close();
    
    });

test("Should open the Tutorial scene correctly",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.click('button.col-md-2.btn.btn-info');
    await page.close();
        
    });

test("Should open the Sign in page correctly",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.click('a.nav-link');
    await page.close();
            
});


