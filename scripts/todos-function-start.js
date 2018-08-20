const loadTodos = function () {
    // Call pre-filtered list of Todos
    if (localStorage.getItem('todos') != null) {
        return JSON.parse(localStorage.getItem('todos'))
    } else {
        return []
    }
}

const saveTodo = function (title, body) {
    let todos = loadTodos()
    todos.push({
        id: uuidv4(),
        title: title,
        body: body,
        complete: false})
    localStorage.setItem('todos', JSON.stringify(todos))
}

const saveAllTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id = id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const displayTodos = function (todos, filter) {
    const filteredTodos = todos.filter(function (todo) {
        if (todo.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            todo.body.toLowerCase().includes(filters.searchText.toLowerCase())) {
        // debugger
            return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })
    document.querySelector('#todos').innerHTML = ''
    var incomplete = 0
    var complete = 0
    // filter out completed todos
    filteredTodos.forEach(function (todo) {
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

const generateTodoDOM = function (todo) {
    const todoRoot = document.createElement('div')
    const todoCheck = document.createElement('input')
    const todoText = document.createElement('span')
    const todoDelete = document.createElement('button')
    const todoTitle = document.createElement('h2')
    
    // setup checkbox
    todoCheck.setAttribute('type', 'checkbox')
    todoCheck.checked = todo.complete
    
    todoCheck.addEventListener('change', function () {
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
        displayTodos(todos, filters)
    })
    todoRoot.appendChild(todoDelete)

    todoTitle.textContent = todo.title

    document.querySelector('#todos').appendChild(todoTitle)
    document.querySelector('#todos').appendChild(todoRoot)

    return todoRoot
}

const summaryDOM = function (todos, incomplete, complete) {
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
