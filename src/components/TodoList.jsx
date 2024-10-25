import TodoItem from './TodoItem';

/**
 *
 * @param {onDeleteFn} listItem 삭제 (item)=> void
 * @returns
 */
export default function TodoList({ items, onDeleteFn }) {
  return (
    <ul>
      {/* 
        items = [
          {
            text: '',
            color: ''
          },{
            text: '',
            clor: ''
          }
        ]
       */}
      {items.map((item) => {
        return (
          <TodoItem
            bgColor={item.color}
            onDelete={() => {
              onDeleteFn(item);
            }}
          >
            {item.text}
          </TodoItem>
        );
      })}
    </ul>
  );
}
