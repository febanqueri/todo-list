//Etapa 1 - Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Etapa 2 - Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Etapa 3 - Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.dysplay = "flex";
                }else{
                    todo.style.display = 'none';
                }
            case "uncomplete":
                if(!todo.classList.constains("completed")){
                    todo.style.dysplay = "flex";
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //CHECK --- HEY do I açready have a thing if there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todo'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
}