/**
 *
 * @returns {todo}
 */
export default function TodoItem({ children, bgColor }) {
  // 배경색과 리스트내용만 변경되는 함수.
  return (
    <li className="todo-item" style={{ backgroundColor: bgColor }}>
      {children}
    </li>
  );
}
