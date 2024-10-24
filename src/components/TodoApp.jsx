import './TodoApp.css';

export default function TodoApp({}) {
  return (
    <div className="todoapp-wrap">
      <div className="todoapp">
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <h1>Todo APP</h1>
          </div>
          <div style={{ display: 'flex' }}>
            <input type="text" style={{ flexGrow: 1 }} />
            <button>입력</button>
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <div>
            <button className="colorpick-btn"></button>
            <button className="colorpick-btn"></button>
            <button className="colorpick-btn"></button>
            <button className="colorpick-btn"></button>
          </div>
        </div>

        <div className="todo-list-wrap">
          <div>
            <h1>Todo Items</h1>
          </div>

          <div style={{ width: '100%' }}>
            <ul>
              <li class="todo-item">item1</li>
              <li class="todo-item">item2</li>
              <li class="todo-item">item3</li>
              <li class="todo-item">item4</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
