import React, { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2'

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');

  const addTodo = () => {
    if (toDo.trim() !== '') {
      const lowercaseToDo = toDo.toLowerCase();
      const isDuplicate = toDos.some((todo) => todo.text.toLowerCase() === lowercaseToDo);
      if (!isDuplicate) {
        setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
        setTodo('');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'This task already exists.',
          icon: 'error',
          confirmButtonText: 'Add Another'
        })
        
      }
    }
  };

  const handleCheckboxChange = (id, status) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !status } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(toDos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          type="text"
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => handleCheckboxChange(todo.id, todo.status)}
              />
              <p>{todo.text}</p>
              {todo.status ? <p  id='task'>Task completed!</p> : null}
            </div>
            <div className="right">
              <i onClick={() => deleteTodo(todo.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
