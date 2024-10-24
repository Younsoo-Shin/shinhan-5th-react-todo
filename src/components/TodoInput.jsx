export default function TodoInput({ pickedColor, todoInput, setTodoInput, addTodo }) {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        style={{
          flexGrow: 1,
          backgroundColor: pickedColor,
        }}
        value={todoInput}
        onChange={(e) => {
          setTodoInput(e.target.value);
        }}
      />
      <button onClick={addTodo}>입력</button>
    </div>
  );
}
