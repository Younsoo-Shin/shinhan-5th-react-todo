import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchTodoList } from '../services/todoService';

export const TodoContext = createContext(null);

export default function TodoContextProvider({ children }) {
  const [todoList, setTodoList] = useState([
    {
      text: '초기값',
      color: 'green',
    },
  ]);

  const addTodo = (todo) => {
    const newTodoList = [
      ...todoList,
      {
        id: uuidv4(),
        text: todo.text,
        color: todo.color,
      },
    ];
    setTodoList(newTodoList);
    localStorage.setItem('todoarr', JSON.stringify(newTodoList));
  };

  useEffect(() => {
    fetchTodoList().then((data) => {
      if (data) {
        setTodoList(data);
      }
    });

    // const data = localStorage.getItem('todoarr');
    // if (data) {
    //   setTodoList(data);
    // }
  }, []);

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodoList(newTodoList);
    localStorage.setItem('todoarr', JSON.stringify(newTodoList));
  };

  const updateTodo = (todoId, todo) => {
    const newTodoList = todoList.map((prevTodo) => {
      if (prevTodo.id === todoId) {
        return {
          ...prevTodo,
          ...todo,
        };
      }
      return prevTodo;
    });
    setTodoList(newTodoList);
    localStorage.setItem('todoarr', JSON.stringify(newTodoList));
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, removeTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
