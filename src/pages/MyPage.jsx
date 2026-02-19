// pages/MyPage.jsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useModal } from "../components/hooks/useModal";
import { deleteUser } from "../api/auth.api";
import PasswordConfirm from "../components/auth/PasswordConfirm";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
    // 탭 상태 관리 ("omamori" | "posts" | "bookmarks")
    const [activeTab, setActiveTab] = useState("omamori");

    const [step, setStep] = useState("default");
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { openModal } = useModal();

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
                <button onClick={() => openModal("profileEdit")}>프로필 수정</button>
                <button onClick={() => openModal("socialLink")}>계정 연동 관리</button>
                <button onClick={handleLogout}>로그아웃</button>
                <button onClick={handleDeleteAccount}>회원탈퇴</button>
            </header>

            <hr />

            {/* 메뉴 영역 */}
            <nav>
                <button onClick={() => setActiveTab("omamori")}>
                    {activeTab === "omamori" ? "★ 내 오마모리" : "내 오마모리"}
                </button>
                <button onClick={() => setActiveTab("posts")}>
                    {activeTab === "posts" ? "★ 작성 글" : "작성 글"}
                </button>
                <button onClick={() => setActiveTab("bookmarks")}>
                    {activeTab === "bookmarks" ? "★ 북마크" : "북마크"}
                </button>
            </nav>

            <hr />

            {/* 행운 컬러 보기 */}
            <section>
                <button> 오늘의 행운 컬러 보기 </button>
            </section>

        </div>
    );
}
