import React, { useEffect, useState } from 'react';

const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        await fetch("https://playground.4geeks.com/todo/users/Mariona", {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setTasks(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      useEffect(() => {
        getTasks();
      }, []);

      const putList = async () => {
        await fetch("https://playground.4geeks.com/todo/users/Mariona", {
          method: "PUT",
          body: JSON.stringify(tasks),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("error", error));
      };
    
      console.log(tasks);
    
    
      useEffect(() => {
        putList();
      }, [tasks]);
      
    
    
    
    const addTask = (event) => {
        if (event.key === 'Enter' && inputValue) {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    

    return (
        <div className="container">
            <h1>TO DO LIST</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={addTask}
                placeholder='What needs to be done?'
            />
            <ul className = "taskList">
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => removeTask(index)}>x</button>
                    </li>
                ))}
            </ul>
            {tasks.length ? "" : <span>Add a new task</span>}
        </div>
    );
}

export default TodoList;