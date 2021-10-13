//-----------------------------------//
// DEFINE UL ELEMENT
//-----------------------------------//


//ELEMENT CALLING
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//-----------------------------------//
// DEFINE EVENT LISTENERS
//-----------------------------------//

form.addEventListener('submit', addTask);

//REMOVE

taskList.addEventListener('click', removeTask);

//CLEAR

clearBtn.addEventListener('click', clearTask);

//FILTER

filter.addEventListener('keyup', filterTask);

//FOR SHOW TASKS IN MAIN PAGE AFTER RELOAD PAGE FROM LOCAL STOREAGE
 document.addEventListener("DOMContentLoaded", getTask);

//-----------------------------------//
// DEFINE FUNCTION
//-----------------------------------//

//ADD TASK


function addTask(e) {    // e --> event
    if (taskInput.value === '') {
        alert("Add a Task!");
    } else {
        // CREATE LI ELEMENT
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        //for cross button
        let link = document.createElement("a");
         link.setAttribute("href", "#");
         link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);

        // SRORE TASK IN LOCAL STORAGE

       storeTaskInLocalStorage(taskInput.value);

       taskInput.value = ' ';
    }
   e.preventDefault(); //IT HELP TO PREVENT LOAD
}

//REMOVE TASK

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            // console.log(ele);
            ele.remove();
            removeFromLS(ele);  //REMOVE TASK UFTER RELOAD OR LOCAL STORAGE
        }
        //console.log(e.target);
    }
}

//CLEAR TASK

function clearTask(e){

  //  taskList.innerHTML = " ";

  //FASTER WAY

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();   //CLEAR WHEN ALSO RELOAD PAGE
}

//FILTER TASK

function filterTask(e) {
    let text = e.target.value.toLowerCase();   //CONVERT INTO LOWERCA
    // console.log(text)
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";   //show item
        } else {
            task.style.display = "none";
        }
    });
}

// STORE IS LOCAL STORAGE

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {   
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
   
}


//TO SHOW TASKS IN MAIN PAGE

function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {   
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        //for cross button
        let link = document.createElement("a");
         link.setAttribute("href", "#");
         link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);

    });

 }

 //REMOVE TASKS FROM LOCAL STORAGE AND ALSO LOCAL STORAGE

function removeFromLS(taskItem){
   let tasks;
    if (localStorage.getItem('tasks') === null) {   
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task,index) => {
        if(li.textContent.trim() === task){   //TRIM USE FOR WHEN THEY HAVE SPACE AND ALSO REMOVE SPACE
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

}
