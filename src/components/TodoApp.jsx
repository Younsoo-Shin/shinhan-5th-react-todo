import { useCallback, useEffect, useMemo, useState } from 'react';
import './TodoApp.css';

const COLOR_PICK_LIST = ['white', 'red', 'yellow', 'pink', 'green', 'violet'];
import TodoInput from './TodoInput';
import Colorbar from './Colorbar';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import { getChoseong } from 'es-hangul';

export default function TodoApp({}) {
  const [todoInput, setTodoInput] = useState('');
  const [todoArray, setTodoArray] = useState([
    {
      text: 'initialTodo',
      color: 'green',
    },
    {
      text: '신윤수',
      color: 'green',
      chosung: 'ㅅㅇㅅ',
    },
  ]);
  const [pickedColor, setPickedColor] = useState(COLOR_PICK_LIST[0]);

  const [searchInput, setSeartchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

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

  useEffect(() => {
    setSearchResult(
      todoArray.filter((todo) => {
        return (
          todo.text.includes(searchInput) ||
          getChoseong(todo.text).includes(searchInput)
        );
      })
    );
  }, [searchInput, todoArray]);

  const renderedList = useMemo(() => {
    return searchInput ? searchResult : todoArray;
  }, [searchResult, todoArray, searchInput]);

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
          <TodoInput
            pickedColor={pickedColor}
            todoInput={todoInput}
            setTodoInput={setTodoInput}
            addTodo={addTodo}
          />

          <div style={{ display: 'flex', marginTop: 10 }}>
            <input
              type="text"
              style={{
                flexGrow: 1,
              }}
              placeholder="검색"
              onChange={(e) => {
                setSeartchInput(e.target.value);
              }}
              value={searchInput}
            />
          </div>
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
            {/* <TodoList items={todoArray} /> */}
            <TodoList items={renderedList} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CSS 단위 (width, height)
 * - px: 절대적인 크기
 * - em: 상대적인크기 (엘리먼트의 font-size에 대비한 상대적인 크기)
 * - rem: root태그의 font-size에 대비한 상대적인 크기(html태그 or body 태그)
 * - vw/vh: viewport에 대한 상대적인 크기 (~100vw/vh) viewport: 현재 스크린사이즈
 * - %: 상위엘리먼트의 width/height에 대비해 몇 %의 크기를 차지할 것이냐?
 */
