let nextQuestion = 0;
let maxAmount = 10;
let questionAmount = 1
const quizApi = `https://opentdb.com/api.php?amount=${maxAmount}&category=18&encode=url3986`
let IC;
let score = 0;
let q, correct_answer,questions;

let scoreText = document.getElementById('score');
let maxQuestionsText = document.getElementById('max-questions');
maxQuestionsText.textContent = `Question # ${questionAmount}`

function fetchQuestion() {
    fetch(quizApi)
    .then(res => res.json())
    .then(
        createQuestion
    )
    .catch(error => {
        console.log(error)
    });
    
}
fetchQuestion()
   
function createQuestion(data) {

    //clearing before next question
    document.querySelector('.quiz').innerHTML = '';
    document.getElementById('QA').innerHTML = '';
    scoreText.style.color = 'white';
    IC = []
    
    q = data.results

    //getting the first question
    questions = q[nextQuestion]
    //adding question to html
    const question_element = document.createElement('h2');
    question_element.textContent = decodeURIComponent(questions['question']);
    document.querySelector('.quiz').append(question_element);
    correct_answer = questions['correct_answer'];
    //pushing correct answer and incorrect in array
    IC.push(decodeURIComponent(questions['correct_answer']))
    questions['incorrect_answers'].forEach(el => {
        IC.push(decodeURIComponent(el));
     })
    IC.sort();
    //create list elements
    IC.forEach(list => {
        const answers = document.createElement('li');
        answers.classList.add('answers');
        answers.innerText = list;
        document.querySelector('ul').appendChild(answers);
        answers.addEventListener('click', check_answer);
    })

}

function check_answer(e) {
     let answer = e.target.textContent;
     questionAmount++;
    maxQuestionsText.textContent = `Question # ${questionAmount}`;
    nextQuestion++;
    if( answer == correct_answer) {
        score++;
        scoreText.textContent = `Score: ${score}`;
        fetchQuestion();
    }else {
        fetchQuestion()
        scoreText.style.color = 'red';
    }
    if (nextQuestion == maxAmount) {
        gameOver();
    }
  
}

function gameOver() {
    let gameOverText = document.querySelector('.container');
    gameOverText.style.fontSize = '3rem';
    if(score >= 5) {
        gameOverText.textContent = `Good job, Your Score: ${score} / ${maxAmount}`;
    }else {
        gameOverText.textContent = `Better luck next time, Your Score: ${score} / ${maxAmount}`;
        
    }
}




