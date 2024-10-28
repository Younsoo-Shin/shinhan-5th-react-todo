import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';

export default function useTodo() {
  const { todoList, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  return {
    todoList,
    addTodo,
    removeTodo,
    updateTodo,
  };
}
