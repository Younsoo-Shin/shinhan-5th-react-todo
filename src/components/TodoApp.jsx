import { useCallback, useEffect, useMemo, useState } from 'react';
import './TodoApp.css';

const COLOR_PICK_LIST = ['white', 'red', 'yellow', 'pink', 'green', 'violet'];
const STORAGE_TODO_KEY = 'todoarr';
import TodoInput from './TodoInput';
import Colorbar from './Colorbar';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import { getChoseong } from 'es-hangul';
import { v4 as uuidv4 } from 'uuid';

/**
 * 1. TodoItem에 수정버튼을 만든다.
 *    -> button태그 이용해서 만든다.
 * 2. 수정버튼을 클릭하면, TodoItem에 Rendering되는 Todo 컨텐츠를 감싸는 태그를 input으로 보이게 한다.
 *    -> 수정버튼에 onClick 이벤트 핸들러 연결.
 *        -> 이벤트 내용은. 현재 수정버튼이 클릭되었는지에 대한 state를 변경하는 함수 호출. (state이름: isEditMode)
 *    -> isEditMode가 true -> 컨텐츠를 input태그로 감싸서 // isEditMode: false -> 컨텐츠를 div태그로
 * 3. input의 기본 value값은 기존 todo.text로 한다.
 *    -> 해당 input내용을 기존에 존재하던 todo.text로 하되, state를 하나 부여하여 관리필요. (사용자입력을 저장할 state)
 * 4. input이 변경되고, 다시 수정버튼을 누르면 해당 내용으로 저장된다.
 *    -> 수정버튼에 onClick 이벤트 핸들러 내용 수정 --> isEditMode가 true일 경우엔 저장. 
 *    -> isEditMode가 false일 경우엔 input태그로 변경
 =>필요 리소스
 1. isEditMode라는 state
 2. onClickEditBtn이라는 EventHandler 필요.
      - 1. isEditMode 변경.
      - 2. updateTodo 호출
 3. editInput: 사용자 입력을 저장할 State
 4. updateTodo라는 함수 필요.
 */

export default function TodoApp({}) {
  const [todoInput, setTodoInput] = useState('');
  const [todoArray, setTodoArray] = useState([
    {
      id: uuidv4(),
      text: 'initialTodo',
      color: 'green',
    },
    {
      id: uuidv4(),
      text: '신윤수',
      color: 'green',
      chosung: 'ㅅㅇㅅ',
    },
  ]);
  const [pickedColor, setPickedColor] = useState(COLOR_PICK_LIST[0]);

  const [searchInput, setSeartchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const loadedTodo = localStorage.getItem(STORAGE_TODO_KEY);
    if (loadedTodo) {
      setTodoArray(JSON.parse(loadedTodo));
    }
  }, []);

  const addTodo = useCallback(() => {
    const newTodoArray = [
      ...todoArray,
      {
        // id: ,
        // uuid: universally unique id
        id: uuidv4(),
        text: todoInput,
        color: pickedColor,
      },
    ];
    setTodoArray(newTodoArray);
    // string만 저장 가능
    // localStorage.setItem(key, value)
    // localStorage.getItem(key);
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(newTodoArray));

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

  const removeItem = (item) => {
    // item을 인자로 받아서, state를 업데이트
    const newTodoArray = todoArray.filter((todo) => {
      return item.id !== todo.id;
    });

    setTodoArray(newTodoArray);
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(newTodoArray));
  };

  const onUpdateFn = (item, newItem) => {
    const newTodoArray = todoArray.map((todo) => {
      if (todo.id === item.id) {
        return {
          ...item,
          ...newItem,
        };
      }
      return todo;
    });
    setTodoArray(newTodoArray);
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(newTodoArray));
  };

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
            <TodoList
              items={renderedList}
              onDeleteFn={removeItem}
              onUpdateFn={onUpdateFn}
            />
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
