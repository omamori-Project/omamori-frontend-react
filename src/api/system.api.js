import axiosIns from "./axiosInstance.js";

/* =========================
   Render (FUNC-006)
========================= */

// 레이어 합성 → 이미지 생성
export const renderOmamori = async (data) => {
  /*
  data 예: {
    canvas: { width: 600, height: 900 },
    side: "front",
    format: "png",
    layers: [...]
  }
  */
  const res = await axiosIns.post("/render/omamori", data);
  return res.data;
};

// 렌더 결과 조회
export const getRenderResult = async (renderCode) => {
  const res = await axiosIns.get(`/renders/${renderCode}`);
  return res.data;
};

// 내 렌더 히스토리
export const getMyRenderHistory = async () => {
  const res = await axiosIns.get("/renders/me");
  return res.data;
};

// 렌더 결과 삭제 (만료 전 수동 삭제)
export const deleteRenderResult = async (renderCode) => {
  await axiosIns.delete(`/renders/${renderCode}`);
  return true;
};

/* =========================
   Files (FUNC-006)
========================= */

// 파일 업로드 → url 반환
export const uploadFile = async (formData) => {
  // formData에 'file', 'purpose', 'visibility' 포함
  const res = await axiosIns.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 파일 삭제
export const deleteFile = async (fileId) => {
  await axiosIns.delete(`/files/${fileId}`);
  return true;
};
