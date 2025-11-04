# Todo React App

Vite + React로 만든 할일 관리 애플리케이션입니다.

## ✨ 주요 기능

### 기본 기능
- ✅ **할일 추가** - 제목, 우선순위, 마감일 설정
- ✏️ **할일 수정** - 모든 필드 수정 가능
- 🗑️ **할일 삭제** - 확인 후 삭제
- ✔️ **완료 상태 토글** - 체크박스로 간편하게

### 고급 기능
- 🎯 **우선순위 관리** - 긴급/높음/보통/낮음 4단계
- 📅 **마감일 관리** - 마감일 설정 및 경과 시간 표시
- 🔍 **필터링** - 우선순위별, 상태별 필터링
- 🔄 **정렬** - 마감일순, 우선순위순, 최신순, 제목순
- 📊 **통계 표시** - 전체, 완료, 진행중 개수 및 우선순위별 통계
- 🚨 **마감 알림** - 마감일이 지난 할일 시각적 강조
- 🎨 **우선순위별 색상** - 직관적인 색상 구분

## 🛠 기술 스택

- **Frontend**: React 18 + Vite
- **Backend API**: Node.js + Express + MongoDB
- **스타일**: CSS3 (Gradient, Grid, Flexbox, Animations)
- **상태 관리**: React Hooks (useState, useEffect)

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 미리보기

```bash
npm run preview
```

## 🔌 백엔드 연결

이 앱은 `http://localhost:5000`에서 실행되는 백엔드 API가 필요합니다.

### API 엔드포인트

- `GET /api/todos` - 모든 할일 조회
- `GET /api/todos/:id` - 특정 할일 조회
- `POST /api/todos` - 새로운 할일 추가
- `PUT /api/todos/:id` - 할일 수정
- `DELETE /api/todos/:id` - 할일 삭제
- `PATCH /api/todos/:id/toggle` - 완료 상태 토글

### Todo 모델 구조

```javascript
{
  _id: String,
  title: String,              // 최대 100자
  completed: Boolean,         // 기본값: false
  priority: String,           // 'low' | 'medium' | 'high' | 'urgent'
  dueDate: Date,              // 마감일
  createdAt: Date,            // 생성일 (자동)
  updatedAt: Date             // 수정일 (자동)
}
```

## 📁 프로젝트 구조

```
todo-react/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx      # 할일 추가 폼 (우선순위, 마감일 포함)
│   │   ├── TodoForm.css
│   │   ├── TodoItem.jsx       # 개별 할일 아이템 (우선순위 배지, 마감일 표시)
│   │   ├── TodoItem.css
│   │   ├── TodoList.jsx       # 할일 목록
│   │   └── TodoList.css
│   ├── services/
│   │   └── todoApi.js         # API 통신 서비스
│   ├── App.jsx                # 메인 앱 (필터링, 정렬, 통계)
│   ├── App.css
│   ├── main.jsx               # 엔트리 포인트
│   └── index.css              # 글로벌 스타일
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 UI 특징

### 우선순위 색상 시스템

- 🔴 **긴급 (Urgent)** - 빨강 계열, 깜빡이는 애니메이션
- 🟠 **높음 (High)** - 주황 계열
- 🔵 **보통 (Medium)** - 파랑 계열
- 🟢 **낮음 (Low)** - 초록 계열

### 마감일 표시

- **오늘** - 오늘 마감
- **내일** - 내일 마감
- **N일 남음** - 남은 일수 표시
- **N일 지남** - 마감일 초과 (빨간색 강조)

### 반응형 디자인

- 데스크톱, 태블릿, 모바일 모두 지원
- 화면 크기에 따라 레이아웃 자동 조정

## 📖 주요 기능 설명

### 할일 추가

1. 제목 입력 (최대 100자)
2. 우선순위 선택 (낮음/보통/높음/긴급)
3. 마감일 선택 (기본값: 오늘)
4. "추가" 버튼 클릭 또는 Enter 키

### 할일 수정

1. 각 할일의 "수정" 버튼 클릭
2. 인라인 편집 모드로 전환
3. 제목, 우선순위, 마감일 수정
4. "저장" 버튼 또는 Enter 키로 저장
5. "취소" 버튼 또는 Escape 키로 취소

### 할일 삭제

- 각 할일의 "삭제" 버튼 클릭
- 확인 대화상자에서 확인

### 완료 상태 토글

- 각 할일 앞의 체크박스 클릭
- 완료된 할일은 투명도가 낮아지고 취소선 표시

### 필터링

- **우선순위별** - 전체/긴급/높음/보통/낮음
- **상태별** - 전체/진행중/완료

### 정렬

- **마감일순** - 마감일이 빠른 순서
- **우선순위순** - 긴급 → 높음 → 보통 → 낮음
- **최신순** - 최근 생성된 순서
- **제목순** - 가나다 순서

### 통계

- **상단 통계** - 전체/완료/진행중 개수
- **우선순위별 통계** - 진행중인 할일의 우선순위별 개수

## ⚙️ 환경 변수

`.env` 파일을 생성하여 API URL을 설정할 수 있습니다:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🚀 개발 환경

- Node.js 16 이상
- npm 7 이상

## 📝 Todo Schema (MongoDB)

```javascript
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '할일 제목을 입력해주세요'],
    trim: true,
    maxlength: [100, '제목은 100자를 넘을 수 없습니다']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: () => new Date()
  }
}, {
  timestamps: true
});
```

## 🎯 향후 개발 계획

- [ ] 할일 검색 기능
- [ ] 할일 카테고리/태그 기능
- [ ] 할일 복제 기능
- [ ] 드래그 앤 드롭으로 순서 변경
- [ ] 다크 모드 지원
- [ ] 로컬 스토리지 백업
- [ ] 반복 일정 기능

## 📄 라이선스

MIT
