const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('category');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const addTaskButton = document.getElementById('addTaskButton');
const searchTaskInput = document.getElementById('searchTask');

function createTaskItem(taskText, category, dueDate) {
    const taskItem = document.createElement('li');
    const taskTextElement = document.createElement('strong');
    taskTextElement.textContent = taskText;

    const categoryElement = document.createElement('span');
    categoryElement.textContent = `Category: ${category}`;

    const dueDateElement = document.createElement('span');
    dueDateElement.textContent = `Due Date: ${dueDate}`;

    const completedButton = document.createElement('button');
    completedButton.textContent = 'Completed';
    completedButton.addEventListener('click', () => {
        taskItem.classList.add('completed');
        completedTaskList.appendChild(taskItem);
        completedButton.remove();
        editButton.remove();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const editedTaskText = prompt('Edit task description:', taskText);
        if (editedTaskText !== null) {
            taskTextElement.textContent = editedTaskText;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(document.createElement('br'));
    taskItem.appendChild(categoryElement);
    taskItem.appendChild(document.createElement('br'));
    taskItem.appendChild(dueDateElement);
    taskItem.appendChild(completedButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskItem.dataset.dueDate = dueDate;

    return taskItem;
}

function compareDueDates(a, b) {
    const dateA = new Date(a.dataset.dueDate);
    const dateB = new Date(b.dataset.dueDate);

    if (dateA < dateB) {
        return -1;
    } else if (dateA > dateB) {
        return 1;
    } else {
        return 0;
    }
}

function sortTasksByDueDate() {
    const tasks = Array.from(taskList.querySelectorAll('li'));
    tasks.sort(compareDueDates);

    tasks.forEach((taskItem) => {
        taskItem.remove();
    });

    
    tasks.forEach((taskItem) => {
        taskList.appendChild(taskItem);
    });
}

function filterTasks(searchQuery) {
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach((taskItem) => {
        const taskTextElement = taskItem.querySelector('strong');
        const taskText = taskTextElement.textContent.toLowerCase();

        if (taskText.includes(searchQuery.toLowerCase())) {
            taskItem.style.display = 'block';
        } else {
            taskItem.style.display = 'none';
        }
    });
}

searchTaskInput.addEventListener('input', () => {
    const searchQuery = searchTaskInput.value;
    filterTasks(searchQuery);
});

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;

    if (taskText.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = createTaskItem(taskText, category, dueDate);
    taskList.appendChild(taskItem);

    sortTasksByDueDate();

    taskInput.value = '';
    categorySelect.value = 'personal';
    dueDateInput.value = '';
});
