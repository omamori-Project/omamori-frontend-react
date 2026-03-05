import axiosIns from "./axiosInstance.js";

/* =========================
   오마모리 공유 (FUNC-004)
========================= */

// 외부 공유용 오마모리 조회
export const getSharedOmamori = async (token) => {
  const res = await axiosIns.get(`/public/shares/${token}`);
  return res.data;
};

// 공유 설정 수정
export const updateShareSettings = async (shareId, data) => {
  const res = await axiosIns.patch(`/shares/${shareId}`, data);
  return res.data;
};

// 미리보기 카드
export const getSharePreview = async (token) => {
  const res = await axiosIns.get(`/public/shares/${token}/preview`);
  return res.data;
};

// 공유 링크 생성
export const createShareLink = async (omamoriId, data) => {
  // data 예: { option: "A", expires_at: "2026-12-31T23:59:59" }
  const res = await axiosIns.post(`/omamoris/${omamoriId}/share`, data);
  return res.data;
};

// 내보내기 (다운로드 URL 반환)
export const exportOmamori = async (omamoriId, data) => {
  // data 예: { format: "png", dpi: 300, includeBack: true }
  const res = await axiosIns.post(`/omamoris/${omamoriId}/export`, data);
  return res.data;
};

// 내가 생성한 공유 링크 목록
export const getMyShareLinks = async (omamoriId) => {
  const res = await axiosIns.get(`/omamoris/${omamoriId}/shares`);
  return res.data;
};

// 공유 링크 삭제/취소
export const deleteShareLink = async (shareId) => {
  await axiosIns.delete(`/shares/${shareId}`);
  return true;
};
