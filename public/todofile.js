document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoTitle = document.getElementById('todoTitle');
    const todoList = document.getElementById('todoList');
  
    // Fetch and display all todos
    async function fetchTodos() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/todos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.className = 'todo-item';
          li.innerHTML = `
            <span>${todo.title}</span>
            <div class="flex space-x-2 mt-2">
              <button class="text-amber-500 hover:text-amber-400" onclick="updateTodo(${todo.id}, '${todo.title}', ${todo.completed})">Update</button>
              <button class="text-red-500 hover:text-red-400" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
          `;
          todoList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
  
    // Add a new todo
    todoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title: todoTitle.value })
        });
        const newTodo = await response.json();
        todoTitle.value = '';
        fetchTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    });
  
    // Update a todo
    window.updateTodo = async (id, title, completed) => {
      const newTitle = prompt('Enter new title', title);
      if (newTitle !== null) {
        try {
          const token = localStorage.getItem('token');
          await fetch(`/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: newTitle, completed })
          });
          fetchTodos();
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      }
    };
  
    // Delete a todo
    window.deleteTodo = async (id) => {
      if (confirm('Are you sure you want to delete this todo?')) {
        try {
          const token = localStorage.getItem('token');
          await fetch(`/todos/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          fetchTodos();
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      }
    };
  
    // Initial fetch of todos
    fetchTodos();
  });