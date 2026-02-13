// auth.api.js 회원관리 api
import axiosIns from "./axiosInstance.js";

// 회원가입
export const auth = async(authData) => {
    const response = await axiosIns.post('/auth/register', authData);
    return response.data;
};

// 로그인
export const login = async(loginData) => {
    const response = await axiosIns.post('/auth/login', loginData);
    return response.data;
};

// 로그아웃
export const logout = async() => {
    await axiosIns.get('/auth/logout');
    return true;
};

// 내 정보 조회
export const myPage = async() => {
    const response = await axiosIns.get('/me');
    return response.data;
};

// 내 정보 수정
export const editMyPage = async(editData) => {
    const response = await axiosIns.patch('/me', editData);
    return response.data;
};

// 회원 탈퇴
export const deleteMyPage = async(password) => {
    await axiosIns.delete('/me', password);
    return true;
};

// (google OAuth) 시작
export const googleAuth = async() => {
    const response = await axiosIns.get('/auth/google');
    return response.data;
};

// (google OAuth) 콜백
export const googleCallBack = async(authorizationCode, state) => {
    await axiosIns.get(`/auth/google/callback?code=${authorizationCode}&state=${state}`);
    return true;
};

// 기존 게정에 Google 연결
export const googleLink = async(data) => {
    await axiosIns.post('/auth/google/link', data);
    return true;
};

// google 연결 해제
export const googleUnlink = async() => {
    await axiosIns.delete('/auth/google/unlink');
    return true;
};

// 내 연결된 로그인 수단 목록
export const loginLIst = async() => {
    await axiosIns.get('/me/identities');
    return true;
};