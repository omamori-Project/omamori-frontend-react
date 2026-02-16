// components/modals/LoginModal.jsx
export default function LoginModal({ onClose }) {
    return (
        <div>
            <h2>로그인 모달</h2>
            <p>여기에 로그인 폼을 만드시면 됩니다.</p>
            <button onClick={onClose}>닫기</button>
        </div>
    );
}