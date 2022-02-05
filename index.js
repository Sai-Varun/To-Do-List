// Local list
let localList = JSON.parse(localStorage.getItem("tasks")) || [];
// nodes for deleting
const listNode = document.getElementById("task-list");
let delButtons = document.getElementsByClassName("delete-btn");
// nodes for adding
const addTaskButton = document.getElementById("add-task-button");
const inputNode = document.getElementById("input-task");
// checkbox checking
const listElements = document.getElementsByClassName("task");
checkboxCheck = ()=> {
    for (let i = 0; i < listElements.length; i++) {
        [listElements[i], listElements[i].parentNode].forEach(el=>{
            el.addEventListener("click", ()=>{
                listElements[i].classList.toggle("strike-through");
                localList[i].checked = localList[i].checked === 0 ? 1 : 0;
                localStorage.setItem("tasks", JSON.stringify(localList));
            });
        });
    }
}
// On clicking delete button remove li element and update the array
addDelFunction = () => {
    for (let i = 0; i < delButtons.length; i++) {
        delButtons[i].addEventListener("click", () => {
            let parentEl = delButtons[i].parentNode;
            parentEl.remove();
            localList = localList.splice(i,i);
            localStorage.setItem("tasks", JSON.stringify(localList));
        });
    }
}
// create To-do-List
createToDo = el => {
    listNode.innerHTML += `<li><label><input type="checkbox" name="done" class="checkBox"><span class="task">`
        + el
        + `</span></label><button class="delete-btn">x</button>`;
    inputNode.value = "";
    addDelFunction();
    checkboxCheck();
}
for(let i = 0; i < localList.length; i++) {
    createToDo(localList[i].task);
}
// initiating list properties
addDelFunction();
checkboxCheck();
// On clicking add item add to array at end and a li element
addTaskButton.addEventListener("click", ()=>{
    let task = inputNode.value;
    if(task !== "") {
        createToDo(task);
        localList.push({checked:0,task:task});
        localStorage.setItem("tasks", JSON.stringify(localList));
        console.log(JSON.parse(localStorage.getItem("tasks")));
    }
})