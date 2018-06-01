const todos = [{
  title: 'Holiday',
  body: 'I need a holiday',
  complete: true
}, {
  title: 'Camping',
  body: 'Looking forward to my next hammock outing',
  complete: false
}, {
  title: 'Check the weekend weather',
  body: 'Looks like rain',
  complete: false
}, {
  title: 'Buy new SIM card for scout camp',
  body: 'Get a Verizon or AT&T SIM card',
  complete: false
}, {
  title: 'Test 2" tree straps',
  body: 'Setup hammock with the new straps and toggles for scout camp',
  complete: false
}]

const incompleteTodos = todos.filter(function (todo) {
  return !todo.complete
})

const completeTodos = todos.length - incompleteTodos.length
// let hideCompTodos = false

const summary = document.createElement('h3')
document.querySelector('body').appendChild(summary)

const filters = {
  searchText: '',
  hideCompTodos: false
}

const displayTodos = function (todos, filter) {
  const filteredTodos = todos.filter(function (todo) {
    if (todo.title.toLowerCase().includes(filters.searchText.toLowerCase())) {
      return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
    } else if (todo.body.toLowerCase().includes(filters.searchText.toLowerCase())) {
      return todo.body.toLowerCase().includes(filters.searchText.toLowerCase())
    }
    // Or remove the example lines below and use these lines. If using this method filteredTodos can be const
    // const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
    // const hideCompleteTodos = !filters.hideCompTodos || !todo.complete

    // return searchTextMatch && hideCompleteTodos
  })

// could have filtered the values inside the displayTodos function rather than pass them in
  //  return !filters.hideCompTodos || !todo.completed

  // OR

  // if (filters.hideCompTodos) {
  //   return !todos.complete
  // } else {
  //   return true
  // }

  document.querySelector('#todos').innerHTML = ''

  filteredTodos.forEach(function (todo) {
    const todoTitle1 = document.createElement('h2')
    const todoBody1 = document.createElement('p')
    todoTitle1.textContent = todo.title
    todoBody1.textContent = todo.body
    document.querySelector('#todos').appendChild(todoTitle1)
    document.querySelector('#todos').appendChild(todoBody1)
    summary.textContent = `You have ${(todos.length)} total Todos and ${filteredTodos.length} Todos left that match your search criteria`
  })
}

// Call pre-filtered list of Todos
displayTodos(todos, filters)

document.querySelector('#filter-todo').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  if (filters.hideCompTodos) {
    displayTodos(incompleteTodos, filters)
  } else {
    displayTodos(todos, filters)
  }
})

document.querySelector('#addTodo').addEventListener('submit', function (e) {
  e.preventDefault()
  console.log(e.target.elements.newTodo.value)
  todos.push({title: e.target.elements.newTodo.value,
    body: 'Something new',
    complete: false})
  e.target.elements.newTodo.value = ''
  displayTodos(todos, filters)
})

document.querySelector('#hideComp').addEventListener('change', function (e) {
  if (e.target.checked) {
    filters.hideCompTodos = true
    displayTodos(incompleteTodos, filters)
  } else {
    filters.hideCompTodos = false
    displayTodos(todos, filters)
  }
})
