import 'dotenv/config';

import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';
import db from './connection.js';



const Query = db.query;
const Result = db.result;
const Related  = db.related;
const app = express();

app.use(cors({origin: ['https://main--querious-search.netlify.app']}));

app.use(express.json());



app.post('/api/search', async (req, res) => {
    const { email, password,query:q} = req.body; 
    const query = q.trim().toLowerCase();
    

    const exists = await Query.findOne({
       where: {
        userQuery: query
       },
       include: [{
        model:Result,
        as:'results',
       },{
        model:Related,
        as:'related_questions'
    }]
    })
    
    if(exists) 
    {
        return res.status(200).json(exists);
    }
   
    const result = await Query.create({userQuery:query});
    let results =  await quoraSearch(email,password,query);
    const data  = [];
    const questions = results.questions
    const answers = results.answers
    const users = results.users
    const related = results.related
    for (let i in questions) {
        const record = {};
        record['question'] = questions[i];
        record['answer'] = answers[i];
        record['user'] = users[i];
        record['queryId'] = result.dataValues.id;
        data.push(record);
    }
    
    const result_res = await Result.bulkCreate(data);
  
    const rel =[];
    for (let r of related) {
        rel.push({
                    'question':r,
                    'queryId':result.dataValues.id
                   
                })
    }

    const related_res = await Related.bulkCreate(rel);
    
    const response ={
        results:result_res,
        related_questions: related_res

    }
   
    return res.status(201).json(response);
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
        const reletedQuestions = document.querySelectorAll('#root > div > div.q-box > div > div.q-box.puppeteer_test_question_main > div > div:nth-child(2) > div > div > div.q-box.dom_annotate_related_questions.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-mb--small.qu-bg--raised > div > div:nth-child(2) > div');
        
        const reletedQuestionsList = [];
        const reletedQuestionsArray = Array.from(reletedQuestions);
        reletedQuestionsArray.map((ques)=>{
            reletedQuestionsList.push(ques.innerText);
        })
        
        return (reletedQuestionsList);
    })
    
    let finalResponse ={
        questions: result.questions,
        answers: result.answers,
        users: result.users,
        related: relQuestions
    }
    
    browser.close();
    return finalResponse;
}



db.sequelize.sync().then(() => {
    console.log("DB Connected");
    app.listen(3000, () => {
        console.log("Server is running at port 3000");
    });
});