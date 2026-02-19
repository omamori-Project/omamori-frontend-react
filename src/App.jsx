import './App.css'
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import GlobalModal from "./components/common/GlobalModal";
import ProtectedRoute from './components/common/ProtectedRoute';
import MyPage from './pages/MyPage';
import OAuthSuccess from './pages/OAuthSuccess';

function App() {
  return (
    <>
      <GlobalModal />

      <Routes>
        {/* 주소가 / 이면 Main페이지 컴포넌트 실행 */}
        <Route path="/" element={<Main />} />

        {/* 구글 계정 로그인 */}
        <Route path="/oauth/callback" element={<OAuthSuccess />} />

        {/* 마이페이지 실행 */}
        <Route path="/mypage" element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
          }
        />   

      </Routes>
    </>
  );
}

export default App;
