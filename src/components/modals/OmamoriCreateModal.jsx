import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { omamori } from "../../api/omamori.api";

export default function OmamoriCreateModal({ onClose }) {
    const [userTitle, setUserTitle] = useState("");
    const navigate = useNavigate();

    // 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await omamori({ title : userTitle }); 
            const newId = response.data.id;

            // 오마모리 제작 이동
            navigate(`/omamori/edit/${newId}`);

            onClose();
        } catch (error) {
        alert("제작 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="오마모리 제목"
                    value={userTitle}
                    onChange={(e) => {setUserTitle(e.target.value)}}
                />
            
                <button type="submit">제목 생성</button>
            </form>
        </div>
    )
}