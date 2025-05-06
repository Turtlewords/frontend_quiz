const main = document.querySelector("main");
const htmlSubject = document.querySelector("#html-subject");
const cssSubject = document.querySelector("#css-subject");
const jsSubject = document.querySelector("#js-subject");
const accessSubject = document.querySelector("#access-subject");
const subjectHeader = document.querySelector("#subject-header")

htmlSubject.addEventListener("click", () => {
    initializeHTML()
})


function initializeHTML() {
    main.style.display = "none";
    subjectHeader.innerHTML = 
    `<div id="html-header" class="subject-header">
        <img src="assets/images/icon-html.svg" alt="html icon">
        <h2>HTML</h2>
    </div>`
}