import './App.css'
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      {/* 주소가 / 이면 Main페이지 컴포넌트 실행 */}
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
