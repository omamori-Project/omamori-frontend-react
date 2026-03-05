import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";
import { useEffect, useState } from "react";
import { omamoriList, updateOmamori } from "../../api/omamori.api";
import { createShareLink, getMyShareLinks, deleteShareLink } from "../../api/sharing.api";
import { useModal } from "../hooks/useModal";

export default function MyOmamoriSection() {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const [title, setTitle] = useState("제목을 입력하세요");
    const [editingId, setEditingId] = useState(null);
    const [omamoris, setOmamoris] = useState([]);
    const [shares, setShares] = useState({}); // { omamoriId: [shares] }

    const fetchOmamoris = async () => {
        try {
            const response = await omamoriList();
            setOmamoris(response.data || []);
        } catch (error) {
            console.error("목록을 불러오는 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        fetchOmamoris();
    }, []);

    const fetchShares = async (omamoriId) => {
        try {
            const res = await getMyShareLinks(omamoriId);
            setShares(prev => ({ ...prev, [omamoriId]: res.data }));
        } catch (err) {
            console.error("공유 목록 조회 실패:", err);
        }
    };

    const handleCreateShare = async (omamoriId) => {
        try {
            await createShareLink(omamoriId, { option: "A" });
            alert("공유 링크가 생성되었습니다.");
            fetchShares(omamoriId);
        } catch (err) {
            alert("링크 생성 실패");
        }
    };

    const handleDeleteShare = async (omamoriId, shareId) => {
        if (!window.confirm("공유 링크를 삭제하시겠습니까?")) return;
        try {
            await deleteShareLink(shareId);
            fetchShares(omamoriId);
        } catch (err) {
            alert("삭제 실패");
        }
    };

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
                        <button onClick={() => handleCreateShare(omamori.id)}>공유 링크 생성</button>
                        <button onClick={() => fetchShares(omamori.id)}>공유 목록 확인</button>
                        
                        {/* 공유 링크 목록 노출 */}
                        {shares[omamori.id] && (
                            <ul style={{ fontSize: "12px", background: "#f0f0f0", padding: "10px" }}>
                                {shares[omamori.id].map(s => (
                                    <li key={s.id}>
                                        <a href={`/public/shares/${s.token}`} target="_blank" rel="noreferrer">
                                            {s.token.substring(0, 8)}...
                                        </a>
                                        <button onClick={() => handleDeleteShare(omamori.id, s.id)} style={{ marginLeft: "5px" }}>삭제</button>
                                    </li>
                                ))}
                            </ul>
                        )}
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