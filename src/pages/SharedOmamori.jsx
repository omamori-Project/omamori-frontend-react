import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSharedOmamori, getSharePreview } from "../api/sharing.api";

export default function SharedOmamori() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        setLoading(true);
        // 실제 공유 데이터 조회
        const response = await getSharedOmamori(token);
        setData(response.data);
      } catch (err) {
        console.error("공유 데이터 조회 실패:", err);
        setError("유효하지 않거나 만료된 공유 링크입니다.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSharedData();
  }, [token]);

  if (loading) return <div style={{ padding: 20 }}>공유된 오마모리를 불러오는 중...</div>;
  if (error) return (
    <div style={{ padding: 20 }}>
      <p style={{ color: "red" }}>{error}</p>
      <button onClick={() => navigate("/")}>메인으로 가기</button>
    </div>
  );

  const { omamori, share } = data || {};

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>{omamori?.title}</h1>
      <div style={{ 
        margin: "20px auto", 
        width: "300px", 
        height: "450px", 
        border: "2px solid #ddd",
        borderRadius: "15px",
        backgroundColor: omamori?.fortune_color?.hex || "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>{omamori?.meaning}</h2>
        <p style={{ color: "#fff" }}>{omamori?.frame?.name}</p>
      </div>
      
      <div style={{ marginTop: 20, color: "gray", fontSize: "14px" }}>
        <p>조회수: {share?.view_count}</p>
        <p>생성일: {new Date(share?.created_at).toLocaleDateString()}</p>
      </div>

      <button 
        style={{ marginTop: 30, padding: "10px 20px" }}
        onClick={() => navigate("/")}
      >
        나만의 오마모리 만들러 가기
      </button>
    </div>
  );
}
