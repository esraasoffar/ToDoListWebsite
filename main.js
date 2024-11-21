let input = document.getElementsByClassName("input")[0];  //edited
let submit = document.getElementsByClassName("add")[0];
let taskForm = document.getElementsByClassName("task-form")[0];
let tasksDiv = document.getElementsByClassName("tasks")[0]; //added



//Empty array for storing the tasks
let arrayOfTasks = [];

//Check if there is tasks in local storage
if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
//Trigger Get Data From Local Storage
getDataFromLocalStorage();

//Click On Task Button
tasksDiv.addEventListener("click", (e) => {
    //Delete Button
    if(e.target.classList.contains("del"))
    {
        //Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        //Remove Elements from Page 
        e.target.parentElement.remove(); 
    }
})

function addTaskToArray(taskText){
    //Task Data
    const task = { 
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array
    arrayOfTasks.push(task);
}

//Function to handle Submit Button
function handleSubmitClick(){
    if (input.value !== ""){
        addTaskToArray(input.value); //Add task to an array of tasks 
        input.value ="";
        // Add Tasks To Page
        addElementsToPageFrom(arrayOfTasks);
        // Add Tasks to Local Storage
        addDataToLocalStorageFrom(arrayOfTasks);
        // For Testing
        console.log(arrayOfTasks);
        console.log(JSON.stringify(arrayOfTasks));
    }
} 
taskForm.addEventListener("submit", (e) => {   //edited
    e.preventDefault(); //no page reload 
    handleSubmitClick();
})
//submit.onclick = handleSubmitClick; 

//Add Tasks To Page
function addElementsToPageFrom(arrayOfTasks){
    // Empty Tasks Div 
    tasksDiv.innerHTML = "";   //tasksDiv or taskForm
    // Looping On Array Of Tasks
    arrayOfTasks.forEach(task => {
        //Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        //Check If Task Is Done 
        if (task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        console.log(div);
        //Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        //Append Button To Main Div
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        //Add Task Div to Tasks Container
        tasksDiv.appendChild(div);
    });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}


