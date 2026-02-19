import './App.css'
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import GlobalModal from "./components/common/GlobalModal";
import ProtectedRoute from './components/common/ProtectedRoute';
import MyPage from './pages/MyPage';
import OAuthSuccess from './pages/OAuthSuccess';
import MyOmamoriSection from './components/omamori/MyOmamoriSection';
import OmamoriCreate from './pages/OmamoriCreate'

function App() {
  return (
    <>
      <GlobalModal />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oauth/callback" element={<OAuthSuccess />} />

        <Route path="/mypage" element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
          }
        >
          <Route index element={<MyOmamoriSection />} /> 
          {/* <Route path="posts" element={<MyPostsSection />} />
          <Route path="bookmarks" element={<MyBookmarksSection />} /> */}
        </Route>

        <Route path="/omamori/create" element={
          <ProtectedRoute>
            <OmamoriCreate />
          </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
