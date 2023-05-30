import puppeteer from 'puppeteer';
import express, { text } from 'express';
import Connection from './connection.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5173/' }));

app.use(express.json());
Connection();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });


app.post('/api/search', (req, res) => {

    const { email, password,query } = req.body; 
  
    quoraSearch(email,password,query);
  
    res.status(201).json({ message: 'query successful' });
});



async function quoraSearch(email,password,query)
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
    await page.type(selector1,query,{delay: 100});
    await page.keyboard.press("Enter");
    await page.waitForNavigation({timeout: 0});

    const results = await page.evaluate(() => {
        
        const questionList = document.getElementsByClassName('q-box qu-borderBottom qu-p--medium qu-pb--tiny');
        const questionResults = [];
        const answerResults = [];
        const userResults = [];
        
        const questionListArray =  Array.from(questionList).map(async (question)=>{
             questionResults.push(question.querySelector('span > a > div > div > div > div > span').innerText);
             const moreButton = question.querySelector('div > div:nth-child(1) > div > div.q-click-wrapper.qu-display--block.qu-tapHighlight--none.qu-cursor--pointer.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT > div.q-box.spacing_log_answer_content.puppeteer_test_answer_content > div > div > div.q-absolute > div');
             
             userResults.push(question.querySelector('div > div:nth-child(1) > div > div.q-click-wrapper.qu-display--block.qu-tapHighlight--none.qu-cursor--pointer.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT > div.q-flex > div > div > div > div > div.q-box.qu-flex--auto > div.q-box > span.q-box').innerText);

           

             moreButton.click();

             setInterval(answerResults.push(question.querySelector('div > div:nth-child(1) > div > div.q-click-wrapper.qu-display--block.qu-tapHighlight--none.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT > div.q-box.spacing_log_answer_content.puppeteer_test_answer_content > div.q-text > span > span').innerText),1000);

          
        });
        
        console.log(questionResults);
        console.log(answerResults);
        console.log(userResults);
        


     
       
    
    });
 
      

}


