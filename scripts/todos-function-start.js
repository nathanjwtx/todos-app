const loadTodos = () => {
    // Call pre-filtered list of Todos
    return localStorage.getItem('todos') != null ? JSON.parse(localStorage.getItem('todos')) : []
}

const saveTodo = (title, body) => {
    let todos = loadTodos()
    todos.push({
        id: uuidv4(),
        title: title,
        body: body,
        complete: false})
    localStorage.setItem('todos', JSON.stringify(todos))
}

const saveAllTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

const findTodo = (id) => {
    var position = -1
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id === id) {
            position = index
        }
    }
    console.log(`Position: ${position}`)
    return position
}

const removeTodo = (id) => {
    // debugger
    console.log(id)
    // const todoIndex = todos.findIndex(todo => todo.id === id)
    // const todoIndex = todos.findIndex(function (todo) {
    //     return todo.id === id
    // })
    const pos = findTodo(id)
    console.log(`pos: ${pos}`)
    if (pos > -1) {
        todos.splice(pos, 1)
    }
    console.log(todos)
}

const displayTodos = (todos, filter) => {
    console.log(todos.length)
    // debugger
    const filteredTodos = todos.filter((todo) => {
        if (todo.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            todo.body.toLowerCase().includes(filters.searchText.toLowerCase())) {
        // debugger
            return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })
    console.log(filteredTodos)
    document.querySelector('#todos').innerHTML = ''
    var incomplete = 0
    var complete = 0
    // filter out completed todos
    // filteredTodos.forEach((todo) => {
    todos.forEach((todo) => {
        if (filter.hideCompTodos && !todo.complete) {
            generateTodoDOM(todo)
            incomplete += 1
        } else if (filter.hideCompTodos && todo.complete) {
            // generateTodoDOM(todo)
            complete += 1
        } else if (!filter.hideCompTodos) {
            generateTodoDOM(todo)
        }
    })
    summaryDOM(todos, incomplete, complete)
}

const generateTodoDOM = (todo) => {
    const todoRoot = document.createElement('div')
    const todoCheck = document.createElement('input')
    const todoText = document.createElement('span')
    const todoDelete = document.createElement('button')
    const todoTitle = document.createElement('h2')
    
    // setup checkbox
    todoCheck.setAttribute('type', 'checkbox')
    todoCheck.checked = todo.complete
    
    todoCheck.addEventListener('change', () => {
        // shorter way of writing the if statement. Reverses the existing boolean
        // todo.complete = !todo.complete
        if (todoCheck.checked) {
            todo.complete = true
        } else {
            todo.complete = false
        }
        saveAllTodos(todos)
        displayTodos(todos, filters)
    })
    todoRoot.appendChild(todoCheck)

    // setup span element
    todoText.textContent = todo.body
    todoRoot.appendChild(todoText)

    // setup delete button
    todoDelete.textContent = 'Remove'
    todoDelete.addEventListener('click', function () {
        removeTodo(todo.id)
        saveAllTodos(todos)
        // debugger
        displayTodos(todos, filters)
    })
    todoRoot.appendChild(todoDelete)

    todoTitle.textContent = todo.title

    document.querySelector('#todos').appendChild(todoTitle)
    document.querySelector('#todos').appendChild(todoRoot)

    return todoRoot
}

const summaryDOM = (todos, incomplete, complete) => {
    var todoCount
    if (complete == todos.length) {
        todoCount = 0
    } else if (complete == 0) {
        todoCount = todos.length
    } else {
        todoCount = incomplete
    }
    summary.textContent = `You have ${(todos.length)} total Todos 
    and ${todoCount} Todos left that match your search criteria`
}
