import './App.css'
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import GlobalModal from "./components/modals/GlobalModal";
import ProtectedRoute from './components/common/ProtectedRoute';
import MyPage from './pages/MyPage';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <>
      <GlobalModal />

      <Routes>
        {/* 주소가 / 이면 Main페이지 컴포넌트 실행 */}
        <Route path="/" element={<Main />} />

        {/* 마이페이지 실행 */}
        <Route path="/mypage" element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
          }
        />

        {/* 프로필 수정 */}
        <Route path="/mypage/edit" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
          }
        />     

      </Routes>
    </>
  );
}

export default App;
