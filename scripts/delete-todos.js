document.querySelector('#delete-all').addEventListener('click', function (e) {
  localStorage.removeItem('todos')
  if (localStorage.getItem('todos') === null) {
    console.log('All Todos removed')
  }
})
