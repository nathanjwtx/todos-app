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
    todos.push({title: title,
        body: body,
        complete: false})
    localStorage.setItem('todos', JSON.stringify(todos))
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
    filteredTodos.forEach(function (todo) {
        generateTodoDOM(todo)
    })
    summaryDOM(todos, filteredTodos)
}

const generateTodoDOM = function (todo) {
    const todoRoot = document.createElement('div')
    const todoCheck = document.createElement('input')
    const todoText = document.createElement('span')
    const todoDelete = document.createElement('button')
    const todoTitle = document.createElement('h2')
    
    // setup checkbox
    todoCheck.setAttribute('type', 'checkbox')
    todoRoot.appendChild(todoCheck)

    // setup span element
    todoText.textContent = todo.body
    todoRoot.appendChild(todoText)

    // setup delete button
    todoDelete.textContent = 'Remove'
    todoRoot.appendChild(todoDelete)

    todoTitle.textContent = todo.title

    document.querySelector('#todos').appendChild(todoTitle)
    document.querySelector('#todos').appendChild(todoRoot)
    

    return todoRoot
}

const summaryDOM = function (todos, filteredTodos) {
    summary.textContent = `You have ${(todos.length)} total Todos 
    and ${filteredTodos.length} Todos left that match your search criteria`
}
