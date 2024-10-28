import useTodo from '../hooks/useTodo';
import { useState } from 'react';
/**
 *
 * @returns {todo}
 */
export default function TodoItem({ todo }) {
  // 배경색과 리스트내용만 변경되는 함수.
  const { removeTodo, updateTodo } = useTodo();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editInput, setEditInput] = useState(todo.text);
  return (
    <li className="todo-item" style={{ backgroundColor: todo.color }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {isEditMode ? (
            <input
              value={editInput}
              onChange={(e) => {
                setEditInput(e.target.value);
              }}
            />
          ) : (
            <div>{todo.text}</div>
          )}
        </div>
        <div>
          <button
            onClick={(e) => {
              if (isEditMode) {
                setIsEditMode(false);
                updateTodo(todo.id, {
                  text: editInput,
                });
              } else {
                setIsEditMode(true);
              }
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              removeTodo(todo.id);
            }}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}
