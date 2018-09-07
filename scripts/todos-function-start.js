const loadTodos = () => {
    // Call pre-filtered list of Todos
    try {
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    } catch (e) {
        return []
    }
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

const saveAllTodos = (todos) => {
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)
    console.log(todoIndex)
    var removed
    if (todoIndex > -1) {
        removed = todos.splice(todoIndex, 1)
    }
    console.log(`Removed: ${removed}`)
    saveAllTodos(todos)
}

const displayTodos = (todos, filter) => {
    console.log(todos.length)
    const filteredTodos = todos.filter((todo) => {
        if (todo.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            todo.body.toLowerCase().includes(filters.searchText.toLowerCase())) {
            return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })
    // const filteredTodos = todos
    document.querySelector('#todos').innerHTML = ''
    var incomplete = 0
    var complete = 0
    // filter out completed todos
    filteredTodos.forEach((todo) => {
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
        if (todo) {
            todo.complete = !todo.complete
        }
        // if (todoCheck.checked) {
        //     todo.complete = true
        // } else {
        //     todo.complete = false
        // }
        saveAllTodos(todos)
        displayTodos(todos, filters)
    })
    todoRoot.appendChild(todoCheck)

    // setup span element
    todoText.textContent = todo.body
    todoRoot.appendChild(todoText)

    // setup delete
    todoDelete.setAttribute('type', 'button')
    todoDelete.textContent = "X"
    todoDelete.addEventListener('click', () => {
        console.log('remove')
        removeTodo(todo.id)
        // saveAllTodos(todos)
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
