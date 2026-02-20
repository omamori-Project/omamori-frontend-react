import { useEffect, useState } from 'react';
import { fortuneColorDetails } from '../../api/omamoriExpansion.api.js'; 
import { useFortune } from '../../context/FortuneContext'; 

export default function FortuneDetailModal({ colorId }) {
    const [resultColor, setResultColor] = useState(null);
    const { setActiveColor } = useFortune(); 

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // 단건 조회 API 호출
                const response = await fortuneColorDetails(colorId);
                setResultColor(response.data);
            } catch (err) {
                console.error("상세 정보 로드 실패", err);
            }
        };
        fetchDetail();
    }, [colorId]);

    const handleColor = () => {
        if (resultColor) {
        setActiveColor({
            // id: resultColor.id,
            hex: resultColor.hex 
        });
        alert(`${resultColor.name} 컬러가 배경에 적용되었습니다!`);
    }
    };

    if (!resultColor) return <div>로딩 중...</div>;

    return (
        <div className="modal-container">
            <h2>{resultColor.name}</h2>
            <div style={{ backgroundColor: resultColor.hex, height: '20px', width: '100%' }}></div>
            <p><strong>한줄평:</strong> {resultColor.short_meaning}</p>
            <p><strong>상세 의미:</strong> {resultColor.meaning}</p>
            
            <div className="tips-section">
                <h3>행운을 높이는 팁</h3>
                <ul>
                    {resultColor.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
            </div>
            
            <button onClick={handleColor}>해당 컬러로 배경 색 적용하기</button>
        </div>
    );
}