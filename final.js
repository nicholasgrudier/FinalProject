// Grabbing my HTML elements
const taskName = document.getElementById("taskName");
const priorityMenu = document.getElementById("priorityMenu");
const taskImportant = document.getElementById("taskImportant");
const submitButton = document.getElementById("submitButton");
const taskManager = document.getElementById("taskManager");

let taskIdCounter = 1; // Keeps track of task IDs
let tasks = []; // List to hold my tasks

// Add task when button is clicked
submitButton.addEventListener("click", addTask);

function addTask() {
    const taskNameValue = taskName.value.trim();
    const currentDate = new Date();

    if (taskNameValue !== "") {
        let newTask = {
            id: taskIdCounter++,
            name: taskName.value,
            priority: priorityMenu.value,
            isImportant: taskImportant.checked,
            isCompleted: false,
            date: currentDate
        };

        tasks.push(newTask);
        console.log(JSON.stringify(tasks));
        displayTasks();
    } else {
        alert("You must input a real task.");
    }

    // Reset input fields
    taskName.value = "";
    priorityMenu.value = "Medium";
    taskImportant.checked = false;
}

function displayTasks() {
    taskManager.innerHTML = ""; // Clear task list first

    tasks.forEach(function(task) {
        let taskHTML = `
        <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 5px; background-color: ${task.isImportant ? 'red' : 'white'};">
            <p style="text-decoration: ${task.isCompleted ? 'line-through' : 'none'};">
                <strong>${task.name}</strong>
            </p>
            <p>Priority: ${task.priority}</p>
            <p>Date Added: ${task.date.toLocaleDateString()}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="completeTask(${task.id})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
        </div>
        `;
        taskManager.innerHTML += taskHTML;
    });
}

function deleteTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1); // Remove task from list
    }
    displayTasks();
}

function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.isCompleted = !task.isCompleted; // Toggle complete state
    }
    displayTasks();
}
