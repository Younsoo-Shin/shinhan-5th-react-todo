import TodoItem from './TodoItem';

export default function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return <TodoItem bgColor={item.color}>{item.text}</TodoItem>;
      })}
    </ul>
  );
}
