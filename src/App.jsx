import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from './services/todoApi'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('active')
  const [sortBy, setSortBy] = useState('dueDate')

  // 할일 목록 불러오기
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('환경변수 확인:', import.meta.env.VITE_API_BASE_URL)
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      const errorMessage = `${err.message}\n\n상세 정보: ${err.name || 'Unknown error'}`
      setError(errorMessage)
      console.error('할일 불러오기 실패 상세:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        apiUrl: import.meta.env.VITE_API_BASE_URL
      })
    } finally {
      setLoading(false)
    }
  }

  // 할일 추가
  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData)
      setTodos([newTodo, ...todos])
    } catch (err) {
      alert(err.message || '할일 추가에 실패했습니다')
      console.error('할일 추가 실패:', err)
    }
  }

  // 할일 수정
  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData)
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo))
    } catch (err) {
      alert(err.message || '할일 수정에 실패했습니다')
      console.error('할일 수정 실패:', err)
    }
  }

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    if (window.confirm('정말로 이 할일을 삭제하시겠습니까?')) {
      try {
        await deleteTodo(id)
        setTodos(todos.filter(todo => todo._id !== id))
      } catch (err) {
        alert(err.message || '할일 삭제에 실패했습니다')
        console.error('할일 삭제 실패:', err)
      }
    }
  }

  // 완료 상태 토글
  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await toggleTodo(id)
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo))
    } catch (err) {
      alert(err.message || '완료 상태 변경에 실패했습니다')
      console.error('완료 상태 변경 실패:', err)
    }
  }

  // 필터링 및 정렬된 할일 목록
  const getFilteredAndSortedTodos = () => {
    let filtered = [...todos]

    // 우선순위 필터
    if (filterPriority !== 'all') {
      filtered = filtered.filter(todo => todo.priority === filterPriority)
    }

    // 상태 필터
    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed)
    } else if (filterStatus === 'active') {
      filtered = filtered.filter(todo => !todo.completed)
    }

    // 정렬
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      
      switch (sortBy) {
        case 'dueDate': {
          // 우선순위 먼저 비교 (긴급>높음>보통>낮음)
          const priorityDiff = priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']
          if (priorityDiff !== 0) return priorityDiff
          // 같은 우선순위면 마감일 순
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        case 'priority': {
          const priorityDiff = priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']
          if (priorityDiff !== 0) return priorityDiff
          // 같은 우선순위면 마감일 순
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredTodos = getFilteredAndSortedTodos()

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">할일 관리</h1>
        
        <TodoForm onAdd={handleAddTodo} />
        
        {loading && <div className="loading">로딩 중...</div>}
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchTodos} className="btn-retry">다시 시도</button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="filters">
              <div className="filter-group">
                <label htmlFor="filterPriority">우선순위</label>
                <select
                  id="filterPriority"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">전체</option>
                  <option value="urgent">긴급</option>
                  <option value="high">높음</option>
                  <option value="medium">보통</option>
                  <option value="low">낮음</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="filterStatus">상태</label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">전체</option>
                  <option value="active">진행중</option>
                  <option value="completed">완료</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sortBy">정렬</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="dueDate">마감일순</option>
                  <option value="priority">우선순위순</option>
                  <option value="createdAt">최신순</option>
                  <option value="title">제목순</option>
                </select>
              </div>
            </div>
            
            <div className="results-info">
              {filteredTodos.length !== todos.length && (
                <span>{todos.length}개 중 {filteredTodos.length}개 표시</span>
              )}
            </div>

            <TodoList
              todos={filteredTodos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
