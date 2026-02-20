import axiosIns from "./axiosInstance.js";

// 행운컬러 입력 기반 결과
export const fortuneColorResult = async(birth) => {
    const response = await axiosIns.post('/fortune-colors/today', birth);
    return response.data;
};

// 행운컬러 목록
export const fortuneColorList = async(page, size, isActive) => {
    const response = await axiosIns.get(`/fortune-colors?page=${page}&size=${size}&isActive=${isActive}`);
    return response.data;
};

// 행운컬러 상세 
export const fortuneColorDetails = async(fortuneColorId) => {
    const response = await axiosIns.get(`/fortune-colors/${fortuneColorId}`);
    return response.data;
};

// 오마모리에 컬러 적용
export const fortuneColor = async(id) => {
    const response = await axiosIns.patch(`/me/theme`, id);
    return response.data;
};

// 행운컬러 적용 해제
export const fortuneColordel = async(omamoriId) => {
    const response = await axiosIns.get(`/omamoris/${omamoriId}/fortune-color`);
    return response.data;
};

// 유저용 프레임 목록
export const frameList = async(isActive, page, size) => {
    const response = await axiosIns.get(`/frames?isActive=${isActive}&page=${page}&size=${size}`);
    return response.data;
};

// 프레임 적용
export const frames = async(omamoriId, frameKey) => {
    const response = await axiosIns.post(`/omamoris/${omamoriId}/apply-frame`, frameKey);
    return response.data;
};

// 프레임 목록(관리자)
export const adminFrames = async(page, size, isActive, keyWord) => {
    const response = await axiosIns.get(`/admin/frames?page=${page}&size=${size}&isActive=${isActive}&keyword=${keyWord}`);
    return response.data;
};

// 프레임 등록(관리자)
export const adminFrameRegistration = async(adminData) => {
    const response = await axiosIns.post('/admin/frames', adminData);
    return response.data;
};

// 프레임 수정(관리자)
export const adminFramePatch = async(frameId, frameData) => {
    const response = await axiosIns.patch(`/admin/frames/${frameId}`, frameData);
    return response.data;
};

// 프레임 삭제(관리자)
export const frameDel = async(frameId) => {
    const response = await axiosIns.delete(`/admin/frames/${frameId}`);
    return response.data;
};

// 프레임 적용 해제(관리자)
export const frameUnapply = async(omamoriId) => {
    const response = await axiosIns.get(`/omamoris/${omamoriId}/frame`);
    return response.data;
};

