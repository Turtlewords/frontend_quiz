const main = document.querySelector("main");
const body = document.querySelector("body");
const darkMode = document.querySelector("#dark-mode");
const sunIcon = document.querySelector("#sun-icon");
const moonIcon = document.querySelector("#moon-icon");
const htmlSubject = document.querySelector("#html-subject");
const cssSubject = document.querySelector("#css-subject");
const jsSubject = document.querySelector("#js-subject");
const accessSubject = document.querySelector("#access-subject");
const quizProgress = document.querySelector("#quiz-progress");
const subjectHeader = document.querySelector("#subject-header")
const submitBtn = document.querySelector("#submit-btn");
const nextBtn = document.querySelector("#next-btn");
const noAnswer = document.querySelector("#no-answer");
const questionEl = document.querySelector("#question")
const questionContainer = document.querySelector("#question-container");
const currentQuestion = document.querySelector("#current-question");
const totalQuestions = document.querySelector("#total-questions");
const scorecardHead = document.querySelector("#scorecard-head");
const scorecard = document.querySelector("#scorecard");
const completed = document.querySelector("#completed");
const scoreEl = document.querySelector("#score");
const scorecardTotalQuestions = document.querySelector("#scorecard-total-questions");
const playAgainBtn = document.querySelector("#play-again");

const questionIcons = document.querySelectorAll(".question-icon");
const subjects = document.querySelectorAll(".subject");
const labels = document.querySelectorAll(".lbl-btn");
const radios = document.querySelectorAll('input[type="radio"]');
const answers = document.querySelectorAll(".answer");

let score = 0;
let globalQuestionIndex = 0;
let subjectIndex;
let darkModeEnabled = false;


window.addEventListener("resize", () => {
    if (darkModeEnabled == false) {
    if (window.innerWidth <= 767) {
        body.style.backgroundImage = "url(assets/images/pattern-background-mobile-light.svg)";
    } else if (window.innerWidth > 767 && window.innerWidth < 1200) {
        body.style.backgroundImage = "url(assets/images/pattern-background-tablet-light.svg)"
    } else {
        body.style.backgroundImage = "url(assets/images/pattern-background-desktop-light.svg)"
    }
} else {
    if (window.innerWidth <= 767) {
        body.style.backgroundImage = "url(assets/images/pattern-background-mobile-dark.svg)";
    } else if (window.innerWidth > 767 && window.innerWidth < 1200) {
        body.style.backgroundImage = "url(assets/images/pattern-background-tablet-dark.svg)"
    } else {
        body.style.backgroundImage = "url(assets/images/pattern-background-desktop-dark.svg)"
    }
}
})



radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        noAnswer.style.display = "none"
    })
})

labels.forEach((label) => {
    label.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            label.parentElement.querySelector('input[type="radio"]').click();
        }
    })
})

radios.forEach((radio) => (
    radio.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            radio.click();
        }
    })
))

subjects.forEach((subject) => {
    subject.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            subject.click();
        }
    })
})

darkMode.addEventListener("change", (e) => {
    if (e.target.checked) {
        activateDarkMode()
    } else {
        activateLightMode()
    }
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (answerSelected()) {
        checkAnswer(subjectIndex, globalQuestionIndex);
    } else {
        noAnswer.style.display = "flex";
    }
    
    
    
    
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayQuestion(subjectIndex, globalQuestionIndex);
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
    uncheckRadios();
    removeIcons();
    quizProgress.value++;
    resetBorders();
    enableRadios();
})

playAgainBtn.addEventListener("click", playAgain);

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

function activateDarkMode() {
    darkModeEnabled - true;
    scorecard.style.color = "white";
    scorecard.style.backgroundColor = "#313E51"
    body.style.backgroundColor = "#3B4D66"
    body.style.color = "white";
    sunIcon.src = "assets/images/icon-sun-light.svg"
    moonIcon.src = "assets/images/icon-moon-light.svg"
    noAnswer.style.color = "white";
    
    if (window.innerWidth <= 767) {
        body.style.backgroundImage = "url(assets/images/pattern-background-mobile-dark.svg)";
    } else if (window.innerWidth > 767 && window.innerWidth < 1200) {
        body.style.backgroundImage = "url(assets/images/pattern-background-tablet-dark.svg)"
    } else {
        body.style.backgroundImage = "url(assets/images/pattern-background-desktop-dark.svg)"
    }
    
    labels.forEach((label) => {
        label.style.backgroundColor = "#313E51"
    })
    subjects.forEach((subject) => {
        subject.style.backgroundColor = "#313E51"
    })
    questionIcons.forEach((icon) => {
        icon.style.backgroundColor = "white";
        icon.style.color = "black";
    })
}

function activateLightMode() {
    darkModeEnabled = false;
    scorecard.style.color = "black";
    scorecard.style.backgroundColor = "white"
    body.style.backgroundColor = "#F4F6FA"
    body.style.color = "black";
    sunIcon.src = "assets/images/icon-sun-dark.svg"
    moonIcon.src = "assets/images/icon-moon-dark.svg"
    noAnswer.style.color = "#EE5454";

    if (window.innerWidth <= 767) {
        body.style.backgroundImage = "url(assets/images/pattern-background-mobile-light.svg)";
    } else if (window.innerWidth > 767 && window.innerWidth < 1200) {
        body.style.backgroundImage = "url(assets/images/pattern-background-tablet-light.svg)"
    } else {
        body.style.backgroundImage = "url(assets/images/pattern-background-desktop-light.svg)"
    }

    labels.forEach((label) => {
        label.style.backgroundColor = "white"
    })
    subjects.forEach((subject) => {
        subject.style.backgroundColor = "white" 
    })
    questionIcons.forEach((icon) => {
        icon.style.backgroundColor = "#F4F6FA";
    })
}

function answerSelected() {
    for (let x of radios) {
        if (x.checked) {
            return true;
        } 
    }   
    return false;
}


async function startGame(subjectIndex) {
    let data = await fetchData();
    data = data.quizzes;

    main.style.display = "none";
    questionContainer.style.display = "flex";
    subjectHeader.innerHTML = 
    `<div  class="subject-header">
        <img src="${data[subjectIndex].icon}" alt="${data[subjectIndex].title} icon" class="${data[subjectIndex].title.toLowerCase()}-icon">
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

function uncheckRadios() {
    radios.forEach((radio) => {
        radio.checked = false;
    })
}

function resetBorders() {
    for (let x of radios) {
        let parent = x.parentElement;
            parent.querySelector(".lbl-btn").style.borderColor = "#A729F5"
    }
}

function removeIcons() {
    radios.forEach((radio) => {
        radio.parentElement.querySelector(".correct-icon").style.display = "none";
        radio.parentElement.querySelector(".incorrect-icon").style.display = "none";
    })
}

async function checkAnswer(subjectIndex, questionIndex) {
    let data = await fetchData();
    data = data.quizzes;
    globalQuestionIndex++;
    if (globalQuestionIndex < data[subjectIndex].questions.length) {
        disableRadios();
        let val = document.querySelector('input[type="radio"]:checked').value;
        if (val == data[subjectIndex].questions[questionIndex].answer) {
       
        score++;
        correctAnswer()
        
        
        } else {
        incorrectAnswer()

        }
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
        noAnswer.style.display = "none"
    } else {
        gameOver();
    }
    
}



async function gameOver() {
    let data = await fetchData();
    data = data.quizzes;

    subjectHeader.innerHTML = "";
    questionContainer.style.display = "none";
    completed.style.display = "flex";
    scorecardHead.innerHTML = 
    `<div  class="subject-header">
        <img src="${data[subjectIndex].icon}" alt="data[subjectIndex].title icon" class="${data[subjectIndex].title.toLowerCase()}-icon">
        <h2>${data[subjectIndex].title}</h2>
    </div>
    `
    scoreEl.textContent = score;
    scorecardTotalQuestions.textContent = data[subjectIndex].questions.length;
    uncheckRadios();
    noAnswer.style.display = "none";
    quizProgress.value = 1;
    enableRadios();

}

function playAgain() {
    completed.style.display = "none";
    main.style.display = "flex"
    score = 0;
    globalQuestionIndex = 0;
    
}

function correctAnswer() {
    for (let x of radios) {
        if (x.checked) {
            let parent = x.parentElement;
            parent.querySelector(".lbl-btn").style.borderColor = "#2FD887"
            parent.querySelector(".correct-icon").style.display = "block";
        }
    }
}

async function incorrectAnswer() {
    let data = await fetchData();
    data = data.quizzes;

    console.log("Answer: " + data[subjectIndex].questions[globalQuestionIndex].answer);

    for (let x of radios) {
        if (x.checked) {
            let parent = x.parentElement;
            parent.querySelector(".lbl-btn").style.borderColor = "#EE5454"
            parent.querySelector(".incorrect-icon").style.display = "block";
            console.log("Value: " + x.value)
        }
        if (x.value == data[subjectIndex].questions[globalQuestionIndex - 1].answer) {
            let parent = x.parentElement;
            parent.querySelector(".correct-icon").style.display = "block";
        }
    }
}

function disableRadios() {
    radios.forEach((radio) => {
        radio.disabled = true;
    })
}

function enableRadios() {
    radios.forEach((radio) => {
        radio.disabled = false;
    })
}
