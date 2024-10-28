import TodoItem from './TodoItem';
import useTodo from '../hooks/useTodo';

export default function TodoList() {
  const { todoList } = useTodo();

  return (
    <ul>
      {todoList.map((todo) => {
        return <TodoItem todo={todo}></TodoItem>;
      })}
    </ul>
  );
}
