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
      debugger
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
  const todoTitle1 = document.createElement('h2')
  const todoBody1 = document.createElement('p')
  todoTitle1.textContent = todo.title
  todoBody1.textContent = todo.body
  document.querySelector('#todos').appendChild(todoTitle1)
  document.querySelector('#todos').appendChild(todoBody1)
}

const summaryDOM = function (todos, filteredTodos) {
  summary.textContent = `You have ${(todos.length)} total Todos 
  and ${filteredTodos.length} Todos left that match your search criteria`
}
