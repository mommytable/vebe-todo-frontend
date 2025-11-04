import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title || '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editDueDate, setEditDueDate] = useState(() => {
    if (todo.dueDate) {
      const date = new Date(todo.dueDate);
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.title || '');
    setEditPriority(todo.priority || 'medium');
    if (todo.dueDate) {
      const date = new Date(todo.dueDate);
      setEditDueDate(date.toISOString().split('T')[0]);
    }
  };

  const handleSave = async () => {
    if (editText.trim()) {
      await onUpdate(todo._id, { 
        title: editText.trim(),
        priority: editPriority,
        dueDate: new Date(editDueDate)
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.title || '');
    setEditPriority(todo.priority || 'medium');
    if (todo.dueDate) {
      const date = new Date(todo.dueDate);
      setEditDueDate(date.toISOString().split('T')[0]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)}일 지남`;
    } else if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '내일';
    } else {
      return `${diffDays}일 남음`;
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: '낮음',
      medium: '보통',
      high: '높음',
      urgent: '긴급'
    };
    return labels[priority] || '보통';
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''} priority-${todo.priority || 'medium'}`}>
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={() => onToggle(todo._id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="todo-edit-input"
            maxLength={100}
            autoFocus
          />
          <div className="todo-edit-controls">
            <div className="edit-field">
              <label>우선순위</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="todo-edit-select"
              >
                <option value="low">낮음</option>
                <option value="medium">보통</option>
                <option value="high">높음</option>
                <option value="urgent">긴급</option>
              </select>
            </div>
            
            <div className="edit-field">
              <label>마감일</label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="todo-edit-date"
              />
            </div>
          </div>
          
          <div className="todo-edit-buttons">
            <button onClick={handleSave} className="btn-save">저장</button>
            <button onClick={handleCancel} className="btn-cancel">취소</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <span className="todo-text">{todo.title}</span>
            <div className="todo-meta">
              <span className={`priority-badge priority-${todo.priority || 'medium'}`}>
                {getPriorityLabel(todo.priority || 'medium')}
              </span>
              {todo.dueDate && (
                <span className={`due-date ${isOverdue() ? 'overdue-text' : ''}`}>
                  📅 {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>
          <div className="todo-actions">
            <button onClick={handleEdit} className="btn-edit">수정</button>
            <button onClick={() => onDelete(todo._id)} className="btn-delete">삭제</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
