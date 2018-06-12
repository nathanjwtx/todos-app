const todos = loadTodos()

const summary = document.createElement('h3')
document.querySelector('body').appendChild(summary)

const filters = {
  searchText: '',
  hideCompTodos: false
}

displayTodos(loadTodos(), filters)

document.querySelector('#filter-todo').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  displayTodos(loadTodos(), filters)
})

document.querySelector('#addTodo').addEventListener('submit', function (e) {
  e.preventDefault()
  saveTodo(e.target.elements.newTodoTitle.value, e.target.elements.newTodoBody.value)
  e.target.elements.newTodoTitle.value = ''
  e.target.elements.newTodoBody.value = ''
  displayTodos(loadTodos(), filters)
})

document.querySelector('#hideComp').addEventListener('change', function (e) {
  if (e.target.checked) {
    filters.hideCompTodos = true
  } else {
    filters.hideCompTodos = false
  }
  displayTodos(loadTodos(), filters)
})

document.querySelector('#delete-all').addEventListener('click', function () {
  deleteTodos()
})
