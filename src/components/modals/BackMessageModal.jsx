import { useState } from "react";
import { backOmamori} from "../../api/omamori.api";

export default function BackMessageModal ({ omamoriData }) {
    const [message, setMessage] = useState(omamoriData.layer?.back_message || "");

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // 뒷면 메세지 제출
    const handleSave = async() => {
        try {
            const response = await backOmamori(omamoriData.omamoriId, {
                back_message: message
            });

            omamoriData.setLayers(prev => prev.map(l => 
                l.type === "frame" ? { ...l, back_message: message } : l
            ));

            alert("메세지가 저장되었습니다.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal">
            <div className="preview">
                <img
                    src={`${baseUrl}${omamoriData.layer.url}`}
                    style={{ opacity: 0.8 }}
                />
            </div>

        <textarea
            placeholder="뒷면에 들어갈 메세지를 입력해주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSave}>저장</button>
        </div>
    );
};