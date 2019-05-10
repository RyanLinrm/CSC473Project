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
    await browser.close();            
    
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
    await browser.close();
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
    await browser.close();    
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
    await browser.close();        
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
    await browser.close();            
});

/*
test("Should open the leaderboard page correctly",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.click('a.leaderboard.nav-link');
    await browser.close();            
});*/

/* This one is not working because the dev webiste's leaderboard and sign in has the same 
button name, which can be changed in the app.js file, need to test when the dev is updated
test("Should open the Sign in page correctly and enter user name and password",async()=>{
    jest.setTimeout(1000000);
    const browser =await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--window-size=1920,1080']
    });
    const page =await browser.newPage();
    await page.goto('https://dev.d39k5usv8gv0fp.amplifyapp.com/');
    await page.click('a.signin.nav-link');
    await page.waitForSelector('div.Form__formContainer___cu04J');
    await page.click('input.Input__input___2Sh1s');
    await page.type('input.Input__input___2Sh1s','username');
            
});
*/