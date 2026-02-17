import { useState } from "react";

export default function PasswordConfirm({ onCancel, onSubmit }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // form 새로고침 방지

        if (!password) {
            setError("비밀번호를 입력해주세요.");
            return;
        }
        
        setError("");
        onSubmit(password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>비밀번호 재확인</h3>

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <button type="submit">확인</button>
                <button type="button" onClick={onCancel}>취소</button>
            </div>
        </form>
    );
}
