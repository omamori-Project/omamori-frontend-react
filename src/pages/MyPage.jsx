// pages/MyPage.jsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../api/auth.api";
import PasswordConfirm from "../components/auth/PasswordConfirm";
import { Navigate } from "react-router-dom";

export default function MyPage() {
    const [step, setStep] = useState("default");
    const { user, logout } = useAuth();
    const navigate = Navigate

    // 로그아웃 핸들러
    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    // 회원탈퇴 핸들러
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");

        if (!confirmDelete) return;

        setStep("confirm");
    };

    // 서버에 회원탈퇴 전달
    const handleDelete = async(password) => {
        try {
            await deleteUser(password);
            alert("탈퇴되었습니다.");
            logout();
            navigate("/");
        } catch (error) {
            alert("비밀번호가 틀렸습니다.");
        }
    }

    // 만일 confirm일 경우, 회원탈퇴 컴포넌트로.
    if (step === "confirm") {
        return (
            <PasswordConfirm onCancel={() => setStep("default")} onSubmit={handleDelete} />
        );
    }

    return (
        <div>

            {/* 상단 유저 정보 영역 */}
            <header>
                <h1>{user?.name} 님</h1>
                <Link to="/mypage/edit">회원정보 수정</Link>
                <button onClick={handleLogout}>로그아웃</button>
                <button onClick={handleDeleteAccount}>회원탈퇴</button>
            </header>

            <hr />

            {/* 메뉴 영역 */}
            <nav>
                <ul>
                    <li>
                        <Link to="/my-omamori">
                            내 오마모리
                        </Link>
                    </li>

                    <li>
                        <Link to="/my-posts">
                            오마모리 게시글
                        </Link>
                    </li>

                    <li>
                        <Link to="/bookmarks">
                            북마크 게시글
                        </Link>
                    </li>
                </ul>
            </nav>

            <hr />

            {/* 행운 컬러 보기 */}
            <section>
                <button> 오늘의 행운 컬러 보기 </button>
            </section>

        </div>
    );
}
