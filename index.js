const main = document.querySelector("main");
const htmlSubject = document.querySelector("#html-subject");
const cssSubject = document.querySelector("#css-subject");
const jsSubject = document.querySelector("#js-subject");
const accessSubject = document.querySelector("#access-subject");
const subjectHeader = document.querySelector("#subject-header")
const submitBtn = document.querySelector("#submit-btn");

const checkBoxes = document.querySelectorAll('input[type="checkbox"]');



console.log("Boxes: " + checkBoxes.length);

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
})

htmlSubject.addEventListener("click", () => {
    initializeHTML()
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


function initializeHTML() {
    main.style.display = "none";
    subjectHeader.innerHTML = 
    `<div id="html-header" class="subject-header">
        <img src="assets/images/icon-html.svg" alt="html icon">
        <h2>HTML</h2>
    </div>`
}

async function displayData() {
    let data = await fetchData();
    data= data.quizzes;
    data.forEach((subject) => {
        console.log(subject.title);
    })

    // data.forEach((subject) => {
    //     console.log(subject)
    // })
}

displayData();