// components/modals/GlobalModal.jsx

import { useModal } from "../hooks/useModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

// 모달 상태 관리
function GlobalModal() {
    const { modal, closeModal, openModal} = useModal();

    // 없으면 아무것도 안그리기
    if (!modal) return null;

    // 로그인 모달로 이동
    if (modal === "signup") {
        return <RegisterModal openModal={openModal} />;
    }
    if (modal === "login") {
        return <LoginModal onClose={closeModal} />;
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", 
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",    
            zIndex: 1000         
        }}>
            {/* 테스트용 박스 */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
                {modalContent}
                {/* 닫기 버튼 임시 추가 */}
                <button onClick={closeModal}>닫기 X</button>
            </div>
        </div>
    );
}

export default GlobalModal;
