import { useState } from 'react';
import useTodo from '../hooks/useTodo';

export default function TodoInput({ pickedColor }) {
  const [todoInput, setTodoInput] = useState('');
  const { addTodo } = useTodo();
  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        style={{
          flexGrow: 1,
          backgroundColor: pickedColor,
        }}
        value={todoInput}
        onChange={(e) => {
          setTodoInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addTodo({
            text: todoInput,
            color: pickedColor,
          });
          setTodoInput('');
        }}
      >
        입력
      </button>
    </div>
  );
}
