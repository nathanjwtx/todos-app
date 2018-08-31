const deleteTodos = () => {
  localStorage.clear()
  console.log('All Todos removed')
  localStorage.getItem('todos')
}
