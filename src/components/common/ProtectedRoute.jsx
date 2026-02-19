import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// 로그인 검문 컴포넌트
export default function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div>로딩중입니다.</div>;

    // 로그인이 되어있지 않다면 메인으로 이동
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    // 로그인이 되어있다면 자식 컴포넌트 실행(자식 페이지)
    return children;
}