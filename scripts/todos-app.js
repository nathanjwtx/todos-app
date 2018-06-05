const todos = []

// const completeTodos = todos.length - incompleteTodos.length

const summary = document.createElement('h3')
document.querySelector('body').appendChild(summary)

const filters = {
  searchText: '',
  hideCompTodos: false
}

const displayTodos = function (todos, filter) {
  const filteredTodos = todos.filter(function (todo) {
    if (todo.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        todo.body.toLowerCase().includes(filters.searchText.toLowerCase())) {
      return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
    }
  })

  document.querySelector('#todos').innerHTML = ''

  filteredTodos.forEach(function (todo) {
    const todoTitle1 = document.createElement('h2')
    const todoBody1 = document.createElement('p')
    todoTitle1.textContent = todo.title
    todoBody1.textContent = todo.body
    document.querySelector('#todos').appendChild(todoTitle1)
    document.querySelector('#todos').appendChild(todoBody1)
    summary.textContent = `You have ${(todos.length)} total Todos 
      and ${filteredTodos.length} Todos left that match your search criteria`
  })
}

// Call pre-filtered list of Todos
displayTodos(todos, filters)

const saveTodo = function (title, body) {
  todos.push({title: title,
    body: body,
    complete: false})
  localStorage.setItem('todos', JSON.stringify(todos))
}

document.querySelector('#filter-todo').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  displayTodos(JSON.parse(localStorage.getItem('todos')), filters)
})

document.querySelector('#addTodo').addEventListener('submit', function (e) {
  e.preventDefault()
  console.log(e.target.elements.newTodoTitle.value)
  saveTodo(e.target.elements.newTodoTitle.value, e.target.elements.newTodoBody.value)
  e.target.elements.newTodoTitle.value = ''
  e.target.elements.newTodoBody.value = ''
  displayTodos(todos, filters)
})

document.querySelector('#hideComp').addEventListener('change', function (e) {
  if (e.target.checked) {
    filters.hideCompTodos = true
  } else {
    filters.hideCompTodos = false
  }
  displayTodos(JSON.parse(localStorage.getItem('todos')), filters)
})
