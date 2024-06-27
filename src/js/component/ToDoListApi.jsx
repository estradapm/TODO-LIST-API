import React, { useEffect, useState } from 'react';


const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
  
    // Obtener las tareas desde la API
    const getTasks = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/todo/users/Mariona");
        const data = await response.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error al conectar con la API", error);
      }
    };
  
    // Actualizar la lista de tareas en la API
    const putList = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/todo/users/Mariona", {
          method: "PUT",
          body: JSON.stringify(tasks),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Tareas actualizadas", data);
      } catch (error) {
        console.error("Error al conectar con la API", error);
      }
    };
  
    // Obtener las tareas cuando el componente se monta
    useEffect(() => {
      getTasks();
    }, []);
  
    // Actualizar la API cuando las tareas cambian
    useEffect(() => {
       {putList(tasks);

       }
    }, []);
  
    // Manejar el submit del formulario para agregar una nueva tarea
    const submitHandler = (e) => {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        setTasks([...tasks, { label: inputValue, done: false }]);
        setInputValue('');
      }
    };
  
    // Eliminar una tarea
    const removeTask = (index) => {
      const newTasks = [...tasks]; 
      newTasks.splice(index, 1); 
      setTasks(newTasks); 
    };
  
    // Limpiar todas las tareas
    const clearAllTasks = () => {
      setTasks([]);
      putList([]);
    };
  
    return (
      <div className="container">
        <h1>TO DO LIST</h1>
        <form className="form-group-toDo" onSubmit={submitHandler}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='What needs to be done?'
          />
        </form>
        <ul className="taskList">
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.label}</span>
              <button onClick={() => removeTask(index)}>X</button>
            </li>
          ))}
        </ul>
        <button onClick={clearAllTasks}>Clear All Tasks</button>
      </div>
    );
  };
  
  export default TodoList;