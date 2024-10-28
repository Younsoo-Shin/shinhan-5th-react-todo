import TodoItem from './TodoItem';

/**
 *
 * @param {onDeleteFn} listItem 삭제 (item)=> void
 * @param {onUpdateFn} listItem 수정 (item, newItem)=> void
 * @returns
 */
export default function TodoList({ items, onDeleteFn, onUpdateFn }) {
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
            onUpdate={({ text }) => {
              onUpdateFn(item, {
                text: text,
              });
            }}
          >
            {item.text}
          </TodoItem>
        );
      })}
    </ul>
  );
}
