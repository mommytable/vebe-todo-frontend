import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim()) {
      await onAdd({ 
        title: title.trim(),
        priority,
        dueDate: new Date(dueDate)
      });
      setTitle('');
      setPriority('medium');
      const today = new Date();
      setDueDate(today.toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새로운 할일을 입력하세요..."
          className="todo-input"
          maxLength={100}
        />
      </div>
      
      <div className="form-row-controls">
        <div className="form-group">
          <label htmlFor="priority">우선순위</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="todo-select"
          >
            <option value="low">낮음</option>
            <option value="medium">보통</option>
            <option value="high">높음</option>
            <option value="urgent">긴급</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">마감일</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="todo-date"
          />
        </div>

        <button type="submit" className="btn-add">추가</button>
      </div>
    </form>
  );
}

export default TodoForm;

