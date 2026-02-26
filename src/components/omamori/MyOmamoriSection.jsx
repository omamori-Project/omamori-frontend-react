import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";
import { useEffect, useState } from "react";
import { omamoriList } from "../../api/omamori.api";
import { useModal } from "../hooks/useModal";
import { updateOmamori } from "../../api/omamori.api";

export default function MyOmamoriSection() {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const [title, setTitle] = useState("제목을 입력하세요");
    const [editingId, setEditingId] = useState(null);

    // 오마모리 수 관리 
    const [omamoris, setOmamoris] = useState([]);

    useEffect(() => {
        (async () => {
        try {
            const response = await omamoriList();
            setOmamoris(response.data || []);
        } catch (error) {
            console.error("목록을 불러오는 중 에러 발생:", error);
        }
        })();
    }, []);

    // 타이틀 수정
    const handleSubmit = async(e, id) => {
        e.preventDefault();

        try {
            // 백 요청 후 페이지 제목 상태 변경
            const response = await updateOmamori(id, { title : title});
            setOmamoris(prev => 
                prev.map(data => data.id === id ? { ...data, title: title } : item)
            );

            setEditingId(null);
        } catch (error) {
            alert("수정 중에 문제가 발생했습니다.");
        }
    };

    return (
        <>
        {/* 제작 이미지 */}
        <div>
            <img
            src={IMAGES.grayOmamori}
            onClick={() => openModal("omamori")}
            alt="오마모리 생성"
            style={{ cursor: "pointer" }}
            />
        </div>

        {/* 오마모리 목록 */}
        <div>
            {omamoris.length === 0 ? (
            <p>아직 만든 오마모리가 없습니다. 오마모리를 생성해보세요!</p>
            ) : (
            <div>
                {omamoris.map((omamori) => (
                <div
                    key={omamori.id}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                >
                    {/* 수정을 클릭한 경우, 제목 */}
                    {editingId === omamori.id ? (
                    <form onSubmit={(e) => handleSubmit(e, omamori.id)}>
                        <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        />
                        <button type="submit">완료</button>
                    </form>
                    ) : (
                    <div>
                        {/* 제목 클릭 시 제목 수정 폼 */}
                        <h3
                            onClick={()=> navigate(`/omamori/edit/${omamori.id}`)}>{omamori.title}
                        </h3>
                        <p
                        onClick={() => {
                            setEditingId(omamori.id);
                            setTitle(omamori.title);
                        }}>
                        수정
                        </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}