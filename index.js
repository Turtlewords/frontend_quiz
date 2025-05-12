const main = document.querySelector("main");
const htmlSubject = document.querySelector("#html-subject");
const cssSubject = document.querySelector("#css-subject");
const jsSubject = document.querySelector("#js-subject");
const accessSubject = document.querySelector("#access-subject");
const subjectHeader = document.querySelector("#subject-header")
const submitBtn = document.querySelector("#submit-btn");
const noAnswer = document.querySelector("#no-answer");
const questionEl = document.querySelector("#question")
const currentQuestion = document.querySelector("#current-question");
const totalQuestions = document.querySelector("#total-questions");

const answerCount = document.querySelectorAll('input[type="radio"]');
const answers = document.querySelectorAll(".answer");

let score = 0;

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noAnswerSelected()
})

htmlSubject.addEventListener("click", () => {
    startGame(0);
})

cssSubject.addEventListener("click", () => {
    startGame(1);
})

jsSubject.addEventListener("click", () => {
    startGame(2);
})

accessSubject.addEventListener("click", () => {
    startGame(3);
})

const fetchData = async () => {
    try { 
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json()
        return data;
    } catch(error) {
        alert(error)
    }
}

function noAnswerSelected() {
    for (let x of answerCount) {
        if (x.checked) {
            return true;
        } else {
            noAnswer.style.display = "flex";
            return false;
        }
    }   
}

function initializeHTML() {
    
    main.style.display = "none";
    subjectHeader.innerHTML = 
    `<div id="html-header" class="subject-header">
        <img src="assets/images/icon-html.svg" alt="html icon">
        <h2>HTML</h2>
    </div>`
}


async function startGame(subjectIndex) {
    let data = await fetchData();
    data = data.quizzes;

    let index = 0;

    main.style.display = "none";
    subjectHeader.innerHTML = 
    `<div  class="subject-header">
        <img src="${data[subjectIndex].icon}" alt="html icon">
        <h2>${data[subjectIndex].title}</h2>
    </div>`

    displayQuestion(subjectIndex, index);

}

async function displayQuestion(subjectIndex, questionIndex) {
     let data = await fetchData();
    data = data.quizzes;

    questionEl.textContent = data[subjectIndex].questions[questionIndex].question;

    currentQuestion.textContent = questionIndex + 1;
    totalQuestions.textContent = data[subjectIndex].questions.length;


    displayOptions(subjectIndex, questionIndex);
}


async function displayOptions(subjectIndex, questionIndex) {
    let data = await fetchData();
    data = data.quizzes;
    let len = data[subjectIndex].questions[questionIndex].options.length;

    for (let i = 0; i < len; i++) {
        answers[i].textContent = data[subjectIndex].questions[questionIndex].options[i];
    }
}

async function displayData() {
    let data = await fetchData();
    data = data.quizzes;
    console.log(data[0]);
    data.forEach((subject) => {
        console.log(subject.title);
    })

    // data.forEach((subject) => {
    //     console.log(subject)
    // })
}

displayData();