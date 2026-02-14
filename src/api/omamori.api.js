// omamori.api.js
import axiosIns from "./axiosInstance.js";

// 오마모리 생성
export const omamori = async(omamoriData) => {
    const response = await axiosIns.post('/omamoris', omamoriData);
    return response.data;
}

// 오마모리 복제
export const duplicationOmamori = async(omamoriId) => {
    const response = await axiosIns.post(`/omamoris/${omamoriId}/duplicate`);
    return response.data;
}

// 오마모리 조회(편집 및 확인)
export const getOmamori = async(omamoriId) => {
    const response = await axiosIns.get(`/omamoris/${omamoriId}`);
    return response.data;
}

// 오마모리 목록 조회
export const omamoriList = async(status, page, size, sort) => {
    const response = await axiosIns.get(`/omamoris?status=${status}&page=${page}&size=${size}&sort=${sort}`);
    return response.data;
}

// 제작 정보 수정
export const updateOmamori = async(omamoriId, omamoriData) => {
    const response = await axiosIns.patch(`/omamoris/${omamoriId}`, omamoriData);
    return response.data;
}

// 뒷면 메세지 입력 및 수정
export const backOmamori = async(omamoriId, backMessage) => {
    const response = await axiosIns.patch(`/omamoris/${omamoriId}/back-message`, backMessage);
    return response.data;
}

// 오마모리 삭제
export const delOmamori = async(omamoriId) => {
    await axiosIns.delete(`/omamoris/${omamoriId}`);
    return true;
}

// 오마모리 디자인 요소 추가(텍스트/스탬프/배경요소 변경)
export const addOmamoriElement = async(omamoriId, textData) => {
    const response = await axiosIns.post(`/omamoris/${omamoriId}/elements`, textData);
    return response.data;
}

// 요소 재정렬
export const omamoriElementRender = async(omamoriId, omamoriData) => {
    const response = await axiosIns.post(`/omamoris/${omamoriId}/elements/render`, omamoriData);
    return response.data;
} 

// 요소 수정
export const omamoriElementUpdate = async(omamoriId, elementId, contentData) => {
    const response = await axiosIns.patch(`omamoris/${omamoriId}/elements/${elementId}`, contentData);
    return response.data;
}

// 요소삭제
export const omamoriElementDel = async(omamoriId, elementId) => {
    await axiosIns.delete(`omamoris/${omamoriId}/elements/${elementId}`);
    return true;
}

// 임시 저장
export const omamoriSaveDraft = async(omamoriId) => {
    const response = await axiosIns.post(`omamoris/${omamoriId}/save-draft`);
    return response.data;
}

// 최종 저장
export const omamoriSave = async(omamoriId) => {
    const response = await axiosIns.post(`omamoris/${omamoriId}/publish`);
    return response.data;
}

// 레이어 순서 변경
export const omamoriLayerReorder = async(omamoriId, elementId) => {
    await axiosIns.post(`omamoris/${omamoriId}/elements/reorder`, elementId);
    return true;
}