/**
//  * 1. TodoItem에 수정버튼을 만든다.
//  *    -> button태그 이용해서 만든다.

//  * 2. 수정버튼을 클릭하면, TodoItem에 Rendering되는 Todo 컨텐츠를 감싸는 태그를 input으로 보이게 한다.
//  *    -> 수정버튼에 onClick 이벤트 핸들러 연결.
//  *        -> 이벤트 내용은. 현재 수정버튼이 클릭되었는지에 대한 state를 변경하는 함수 호출. (state이름: isEditMode)
//  *    -> isEditMode가 true -> 컨텐츠를 input태그로 감싸서 // isEditMode: false -> 컨텐츠를 div태그로
//  * 3. input의 기본 value값은 기존 todo.text로 한다.
//  *    -> 해당 input내용을 기존에 존재하던 todo.text로 하되, state를 하나 부여하여 관리필요. (사용자입력을 저장할 state)
//  * 4. input이 변경되고, 다시 수정버튼을 누르면 해당 내용으로 저장된다.
//  *    -> 수정버튼에 onClick 이벤트 핸들러 내용 수정 --> isEditMode가 true일 경우엔 저장. 
//  *    -> isEditMode가 false일 경우엔 input태그로 변경
 =>필요 리소스
 1. isEditMode라는 state
 2. onClickEditBtn이라는 EventHandler 필요.
      - 1. isEditMode 변경.
      - 2. updateTodo 호출
 3. editInput: 사용자 입력을 저장할 State
 4. updateTodo라는 함수 필요.
 */

import { useState } from 'react';

/**
 *
 * @params {onDelete} 함수 ()=>void
 * @params {onUpdate} 함수 ({text: string} => void)
 * @returns {todo}
 */
export default function TodoItem({ children, bgColor, onDelete, onUpdate }) {
  // 배경색과 리스트내용만 변경되는 함수.
  const [isEditMode, setIsEditMode] = useState(false);
  const [editInput, setEditInput] = useState(children);

  const onClickEditBtn = () => {
    if (isEditMode) {
      // 1. editMode를 변경
      setIsEditMode(!isEditMode);
      // udpateTodo
      onUpdate({ text: editInput });
    } else {
      setIsEditMode(!isEditMode);
    }
    // 2. updateTodo
  };

  return (
    <li
      className="todo-item"
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {isEditMode ? (
          <input
            value={editInput}
            onChange={(e) => {
              setEditInput(e.target.value);
            }}
          />
        ) : (
          <div>{children}</div>
        )}
      </div>
      <div>
        <button onClick={onClickEditBtn}>수정</button>
        <button
          onClick={(e) => {
            onDelete(e);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}
