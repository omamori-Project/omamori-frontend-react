import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { editMyPage } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function ProfileEditModal() {
    const { user } = useAuth();
    const [nickname, setNickname] = useState(user?.name);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        (async () => {
            const response = await editMyPage({name : nickname});
            alert(`이름을 변경하였습니다. 변경한 이름 : ${nickname}`);
            window.location.reload();
            navigate("/mypage");
        })();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <h2>프로필 수정</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>현재 닉네임</label>
                        <p>{user?.name}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nickname">새 닉네임</label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="새 닉네임 입력"
                        />
                    </div>

                    <div className="modal-button">
                        <button type="submit">
                            저장
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
