import puppeteer from 'puppeteer';
import express from 'express';
import Connection from './connection.js';
import cors from 'cors';
import Result from './model.js';
const app = express();


app.use(cors());



app.use(express.json());
Connection();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });

let response;

app.post('/api/search', async (req, res) => {

    const { email, password,query } = req.body; 
    let results
    results = await Result.findOne({query:query.toLowerCase().trim()});
    if(results) return res.status(200).json(results);
    const response = await quoraSearch(email,password,query);
    results = await Result.create({ query: query.toLowerCase().trim(), users:response.users, questions:response.questions,answers:response.answers, reletedQuestions:response.reletedQuestions});
    res.status(201).json(results);
});



async function quoraSearch(email,password,query)
{
    const browser = await puppeteer.launch({headless:false},{timeout: 0});
    const page  = await browser.newPage();
    await page.goto("https://www.quora.com/");
    await page.type("#email",email,{delay:100});
    await page.type("#password",password,{delay:100});
    const selector = "#root > div > div.q-box > div > div > div > div > div > div.q-flex.qu-mb--large > div:nth-child(2) > div.q-flex.qu-justifyContent--space-between.qu-alignItems--center > button";
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.waitForNavigation({timeout: 0});
    const selector1 = "#root > div > div.q-box > div > div.q-fixed.qu-fullX.qu-zIndex--header.qu-bg--raised.qu-borderBottom.qu-boxShadow--medium.qu-borderColor--raised > div > div:nth-child(2) > div > div.q-box.qu-flex--auto.qu-mx--small.qu-alignItems--center > div > div > form > div > div > div > div > div > input";
    await page.waitForSelector(selector1);
    await page.type(selector1,query,{delay:100});
    await page.keyboard.press("Enter");
    await page.waitForNavigation({timeout: 0});
    let newPageLink;

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
            
            
            const relLink = questionList[0].querySelector('span > a');
            
            newPageLink = relLink.getAttribute('href');
            console.log(questionResults);
            console.log(answerResults);
            console.log(userResults);
            console.log(newPageLink);
            response = {
                questions: questionResults,
                answers: answerResults,
                users: userResults,
                newPage : newPageLink
            }
            return response;
    });
    
    
    let result = results;
    let newLink = result.newPage;
    const page1 = await browser.newPage();
    await page1.goto(newLink);
    const relQuestions = await page1.evaluate(()=>{
        const reletedQuestions = document.querySelectorAll('#root > div > div.q-box > div > div.q-box.puppeteer_test_question_main > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div');
        // console.log(reletedQuestions);
        const reletedQuestionsList = [];
        const reletedQuestionsArray = Array.from(reletedQuestions).map(async(ques)=>{
            reletedQuestionsList.push(ques.innerText);
        })
        return (reletedQuestionsList);
    })
    let finalResponse ={
        questions: result.questions,
        answers: result.answers,
        users: result.users,
        reletedQuestions: relQuestions
    }
    // console.log(finalResponse);
    browser.close();
    return finalResponse;
}