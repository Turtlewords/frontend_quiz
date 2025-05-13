const main = document.querySelector("main");
const htmlSubject = document.querySelector("#html-subject");
const cssSubject = document.querySelector("#css-subject");
const jsSubject = document.querySelector("#js-subject");
const accessSubject = document.querySelector("#access-subject");
const subjectHeader = document.querySelector("#subject-header")
const submitBtn = document.querySelector("#submit-btn");
const nextBtn = document.querySelector("#next-btn");
const noAnswer = document.querySelector("#no-answer");
const questionEl = document.querySelector("#question")
const currentQuestion = document.querySelector("#current-question");
const totalQuestions = document.querySelector("#total-questions");

const radios = document.querySelectorAll('input[type="radio"]');
const answers = document.querySelectorAll(".answer");

let score = 0;
let globalQuestionIndex = 0;
let subjectIndex;

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        noAnswer.style.display = "none"
    })
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    checkAnswer(subjectIndex, globalQuestionIndex);
    noAnswerSelected();

})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayQuestion(subjectIndex, globalQuestionIndex);
    console.log("Subject index: " + subjectIndex);
    console.log("Question index: " + globalQuestionIndex);
    console.log("Score: " + score);
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
})

htmlSubject.addEventListener("click", () => {
    subjectIndex = 0;
    startGame(0);
})

cssSubject.addEventListener("click", () => {
    subjectIndex = 1;
    startGame(1);
})

jsSubject.addEventListener("click", () => {
    subjectIndex = 2;
    startGame(2);
})

accessSubject.addEventListener("click", () => {
    subjectIndex = 3;
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
    for (let x of radios) {
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

    

    main.style.display = "none";
    subjectHeader.innerHTML = 
    `<div  class="subject-header">
        <img src="${data[subjectIndex].icon}" alt="html icon">
        <h2>${data[subjectIndex].title}</h2>
    </div>`

    displayQuestion(subjectIndex, globalQuestionIndex);

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
        radios[i].value = data[subjectIndex].questions[questionIndex].options[i];
    }
}

async function displayData() {
    let data = await fetchData();
    data = data.quizzes;
    console.log(data[0]);
    data.forEach((subject) => {
        console.log(subject.title);
    })

    
}

// finish check answer function

async function checkAnswer(subjectIndex, questionIndex) {
    let data = await fetchData();
    data = data.quizzes;
    globalQuestionIndex++;
    let val = document.querySelector('input[type="radio"]:checked').value;
    if (val == data[subjectIndex].questions[questionIndex].answer) {
        alert("Correct!");
        score++;
        
    } else {
        alert("Incorrect!");
    }
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
    
}



function gameOver() {

}

function resetGame() {

}

displayData();