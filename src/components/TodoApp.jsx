import { useCallback, useState } from 'react';
import './TodoApp.css';

const COLOR_PICK_LIST = ['white', 'red', 'yellow', 'pink', 'green', 'violet'];
import TodoInput from './TodoInput';
import Colorbar from './Colorbar';
import TodoItem from './TodoItem';
import TodoList from './TodoList';

export default function TodoApp({}) {
  const [pickedColor, setPickedColor] = useState(COLOR_PICK_LIST[0]);

  return (
    <div className="todoapp-wrap">
      <div className="todoapp">
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <h1>Todo APP</h1>
          </div>
          {/* 
          - 부모->자식 데이터 전달:props
          - 자식->부모 데이터 전달: X(불가)
          만약 부모의 state를 자식컴포넌트가 변경시키고자 하면,
           --> 부모의 state를 변경하는 함수를 자식에게 전달해주자.
           */}
          <TodoInput pickedColor={pickedColor} />
        </div>

        <div style={{ marginTop: 30, width: '100%' }}>
          <Colorbar
            colorList={COLOR_PICK_LIST}
            onClickColor={(color) => {
              setPickedColor(color);
            }}
          />
        </div>

        <div className="todo-list-wrap">
          <div>
            <h1>Todo Items</h1>
          </div>

          <div style={{ width: '100%' }}>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}
