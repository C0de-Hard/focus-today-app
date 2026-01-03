
const boxes = document.querySelectorAll('.checkbox')
const inputs = document.querySelectorAll('.text')
const info2 = document.querySelector('#info2')
const main = document.querySelector('.main')
const progress = document.querySelector('.progress')

let taskVal = localStorage.getItem('taskVal') ? JSON.parse(localStorage.getItem('taskVal')) : ["","",""];
let taskStatus = localStorage.getItem('taskStatus') ? JSON.parse(localStorage.getItem('taskStatus')) : [false,false,false];

// Calculate done count from taskStatus (single source of truth)
let done = taskStatus.filter(status => status === true).length;

for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = taskVal[i];
}

updateBoxes();
updateProgress();

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click',() => {
        if (areAllfilled()) {
            taskStatus[i] = !taskStatus[i];
            localStorage.setItem('taskStatus',JSON.stringify(taskStatus));
            updateBoxes(); // This will properly sync the visual state
            updateProgress();
            info2.classList.remove('error')
        }
        else info2.classList.add('error')

    });
}
function areAllfilled() {
    for (const val of taskVal) {
        if (val === "") {
            return false;
        }
    }
    return true;
}
function updateProgress() {
    // Always calculate done from taskStatus (single source of truth)
    done = taskStatus.filter(status => status === true).length;
    
    progress.style.width = (done/3)*100 + "%";
    progress.innerHTML = `<p>
                ${done}/3 Completed
            </p>`;
}
for (const input of inputs) {
    input.addEventListener('focus', ()=> {
        const str = info2.classList.toString()
        if (str.includes("error")){
            info2.classList.remove('error');
        }
    })
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', (e)=> {
        let textId = inputs[i].id;
        let id = parseInt(textId[4]); //ie after "text" like 2 in "text2"
        //now update in the local storage 
        taskVal[i] = e.target.value;
        localStorage.setItem('taskVal', JSON.stringify(taskVal));
        console.log('Updated taskVal:', taskVal);
    })
}
function updateBoxes(){
    for (let i = 0; i < taskStatus.length; i++) {
        if (taskStatus[i]) {
            boxes[i].parentElement.classList.add('completed');
        } else {
            boxes[i].parentElement.classList.remove('completed');
        }
    }
}