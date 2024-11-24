// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load saved tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task to the list
addButton.addEventListener('click', addTask);

// Function to add a task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(deleteButton);

        // Mark task as completed on click
        taskItem.addEventListener('click', toggleCompletion);

        todoList.appendChild(taskItem);

        // Save tasks to localStorage
        saveTasks();

        // Clear input field
        todoInput.value = '';
    }
}

// Function to delete a task
function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.remove();
    saveTasks();  // Save after deletion
}

// Function to mark task as completed
function toggleCompletion(e) {
    e.target.classList.toggle('completed');
    saveTasks();  // Save after toggle
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = todoList.querySelectorAll('li');
    taskItems.forEach(task => {
        const taskText = task.textContent.replace('Delete', '').trim();
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', deleteTask);
            taskItem.appendChild(deleteButton);

            // Mark as completed if saved as completed
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskItem.addEventListener('click', toggleCompletion);

            todoList.appendChild(taskItem);
        });
    }
}
