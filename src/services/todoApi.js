const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vibe-todo-backend80-5f1297386c3c.herokuapp.com';

// 모든 할일 조회
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '할일 목록을 불러오는데 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('할일 조회 에러:', error);
    throw error;
  }
};

// 특정 할일 조회
export const getTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '할일을 불러오는데 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('할일 조회 에러:', error);
    throw error;
  }
};

// 새로운 할일 추가
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '할일 추가에 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('할일 추가 에러:', error);
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '할일 수정에 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('할일 수정 에러:', error);
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '할일 삭제에 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('할일 삭제 에러:', error);
    throw error;
  }
};

// 완료 상태 토글
export const toggleTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '완료 상태 변경에 실패했습니다');
    }
    
    return data.data;
  } catch (error) {
    console.error('완료 상태 변경 에러:', error);
    throw error;
  }
};

