import { useCallback, useState } from 'react';
import './TodoApp.css';

const COLOR_PICK_LIST = ['white', 'red', 'yellow', 'pink', 'green', 'violet'];

export default function TodoApp({}) {
  const [todoInput, setTodoInput] = useState('');
  const [todoArray, setTodoArray] = useState([
    {
      text: 'initialTodo',
      color: 'green',
    },
  ]);
  const [pickedColor, setPickedColor] = useState(COLOR_PICK_LIST[0]);

  const addTodo = useCallback(() => {
    setTodoArray((prevTodoArr) => [
      ...prevTodoArr,
      {
        text: todoInput,
        color: pickedColor,
      },
    ]);
    setTodoInput('');
  }, [todoInput, pickedColor]);

  return (
    <div className="todoapp-wrap">
      <div className="todoapp">
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <h1>Todo APP</h1>
          </div>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              style={{ flexGrow: 1, backgroundColor: pickedColor }}
              value={todoInput}
              onChange={(e) => {
                setTodoInput(e.target.value);
              }}
            />
            <button onClick={addTodo}>입력</button>
          </div>
        </div>

        <div style={{ marginTop: 30, width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              maxWidth: 200,
              margin: 'auto',
            }}
          >
            {COLOR_PICK_LIST.map((color, idx) => (
              <button
                className="colorpick-btn"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setPickedColor(color);
                }}
              ></button>
            ))}
          </div>
        </div>

        <div className="todo-list-wrap">
          <div>
            <h1>Todo Items</h1>
          </div>

          <div style={{ width: '100%' }}>
            <ul>
              {todoArray.map((todo) => {
                return (
                  <li className="todo-item" style={{ backgroundColor: todo.color }}>
                    {todo.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
