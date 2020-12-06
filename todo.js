const pendingList = document.getElementById("js_pending"),
    finishedList = document.getElementById("js_finished"),
    todoForm = document.querySelector(".js_toDoForm"),
    todoInput = todoForm.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTask, finishedTask;



function removeFromPending(liId) {
    pendingTask = pendingTask.filter(task => {
        return liId !== task.id
    });
}

function removeFromFinished(liId) {
    finishedTask = finishedTask.filter(task => {
        return liId !== task.id
    });
}

function addToFinished(task) {
    finishedTask.push(task);
}

function addToPending(task) {
    pendingTask.push(task);
}

function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTask));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTask));
}

function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromPending(li.id);
    saveState();
}

function findInPending(liId) {
    return pendingTask.find(task => {
        return task.id === liId;
    })
}

function findInFinished(liId) {
    return finishedTask.find(task => {
        return task.id === liId;
    })
}


function handleFinishClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    paintFinishedTask(task);
    saveState();
}

function handleBackClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(task);
    paintPendingTask(task);
    saveState();
}

function buildGenericLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleBtn = document.createElement("button");
    span.innerText = task.text;
    deleBtn.innerText = "❌";
    deleBtn.addEventListener("click", deleteTask);
    li.append(span, deleBtn);//두가지 이상 child 로 추가가능
    li.id = task.id;
    return li
}

function paintPendingTask(task) {
    const genericLi = buildGenericLi(task);
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✅";
    completeBtn.addEventListener("click",handleFinishClick);
    genericLi.append(completeBtn);
    pendingList.appendChild(genericLi)

}

function paintFinishedTask(task) {
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);
    genericLi.appendChild(backBtn);
    finishedList.appendChild(genericLi);    
}

function loadState() {
    pendingTask = JSON.parse(localStorage.getItem(PENDING));
    finishedTask = JSON.parse(localStorage.getItem(FINISHED));
    // 전역변수로 설정해준 pedningTask/finishedTask 변수안의 내용을 여기서 채워준다.
}

function restoreState() {
    pendingTask.forEach(task => {
        paintPendingTask(task)
    });
    finishedTask.forEach(task => {
        paintFinishedTask(task)
    });
}

function getTaskObj(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function handleFormSubmit(event) {
    event.preventDefault();
    const taskObj = getTaskObj(todoInput.value);
    todoInput.value = ""
    pendingTask.push(taskObj);
    paintPendingTask(taskObj);
    saveState();
}


function init() {
    todoForm.addEventListener("submit", handleFormSubmit);
    loadState();
    restoreState();
}

init();