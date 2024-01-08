document.addEventListener('DOMContentLoaded', function() {
    const newItemInput = document.querySelector('#newItem input');
    const todoList = document.getElementById('todoList');

    function addTodoItem() {
        const taskName = newItemInput.value.trim();

        if (taskName !== '') {
            const newTask = createTaskElement(taskName);
            todoList.appendChild(newTask);

            saveTodoListToLocalStorage(); 

            newItemInput.value = '';
        }
    }

    function createTaskElement(taskName) {
        const newTask = document.createElement('div');
        newTask.classList.add('todo__item');

        const taskText = document.createElement('div');
        taskText.innerText = taskName;
        newTask.appendChild(taskText);

        const deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = '❌';
        deleteButton.addEventListener('click', function() {
            newTask.remove();
            saveTodoListToLocalStorage(); // Atualizar o localStorage após deletar a tarefa
        });
        newTask.appendChild(deleteButton);

        return newTask;
    }

    function saveTodoListToLocalStorage() {
        const tasks = Array.from(todoList.children).map(task => task.firstChild.innerText);
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    function loadTodoListFromLocalStorage() {
        const storedTasks = localStorage.getItem('todoTasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(taskName => {
                const newTask = createTaskElement(taskName);
                todoList.appendChild(newTask);
            });
        }
    }

    if (newItemInput) {
        newItemInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addTodoItem();
            }
        });
    } else {
        console.log('Elemento não encontrado');
    }

   
    loadTodoListFromLocalStorage();
});
