/**
 *
 * @params {onDelete} 함수 ()=>void
 * @returns {todo}
 */
export default function TodoItem({ children, bgColor, onDelete }) {
  // 배경색과 리스트내용만 변경되는 함수.
  return (
    <li
      className="todo-item"
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>{children}</div>
      <div>
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
