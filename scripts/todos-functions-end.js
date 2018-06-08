const deleteTodos = function () {
  localStorage.clear()
  console.log('All Todos removed')
  localStorage.getItem('todos')
}
