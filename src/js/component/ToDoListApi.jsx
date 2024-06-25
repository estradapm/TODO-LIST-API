import React, { useState } from 'react';

const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

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
            {tasks.length ? "" : <span id="warning"> Add a new task</span>}
        </div>
    );
}

export default TodoList;