import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onUpdate, onDelete, onToggle }) {
  if (todos.length === 0) {
    return <div className="empty-message">할일이 없습니다. 새로운 할일을 추가해보세요!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;

