import React, { useEffect, useState } from "react";

export const TodoList = () => {
    const [input, setInput] = useState ("");
    const [lista, setLista] = useState ([]);

    const getLista = async () => {
        try {
            const response = fetch ("https://playground.4geeks.com/todo/users/Mariona");
            const data = await response.json() 
                setLista (data)
        }catch (error) {
            console.log (error)
        }
    }
    const putList = async () => {
        try {
          const response = await fetch("https://playground.4geeks.com/todo/users/Mariona", {
            method: "PUT",
            body: JSON.stringify(lista),
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

      useEffect (() => {
        getLista();
    }, []);
    
    useEffect (() => {
        putList(lista)
    }, [lista])

    const submitHandler = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
          setLista([...tasks, { label: input, done: false }]);
          setInput('');
        }
      };

      const removeTask = (index) => {
        const eliminar = lista.filter ((_, i,) => i !== index)
        setList (eliminar);
      } 
}

