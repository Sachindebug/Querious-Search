import puppeteer from 'puppeteer';
import express from 'express';
import Connection from './connection.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors);
Connection();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });

app.post('/api/posts', (req, res) => {

    const { email, password } = req.body; 
  
    // quora(email,password);
  
    res.status(201).json({ message: 'Post created successfully' });
});


async function quora(email,password)
{
    const browser = await puppeteer.launch({headless:false},{timeout: 0});
    const page  = await browser.newPage();
    await page.goto("https://www.quora.com/");
    await page.type("#email",email,{delay: 100});
    await page.type("#password",password,{delay: 100});
    const selector = "#root > div > div.q-box > div > div > div > div > div > div.q-flex.qu-mb--large > div:nth-child(2) > div.q-flex.qu-justifyContent--space-between.qu-alignItems--center > button";
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.waitForNavigation({timeout: 0});
    const selector1 = "#root > div > div.q-box > div > div.q-fixed.qu-fullX.qu-zIndex--header.qu-bg--raised.qu-borderBottom.qu-boxShadow--medium.qu-borderColor--raised > div > div:nth-child(2) > div > div.q-box.qu-flex--auto.qu-mx--small.qu-alignItems--center > div > div > form > div > div > div > div > div > input";
    await page.waitForSelector(selector1);
    await page.type(selector1,"Best hotels in Banglore",{delay: 100});
    await page.keyboard.press("Enter");
    await page.waitForNavigation({timeout: 0});

    await browser.close();

}
// quora();
