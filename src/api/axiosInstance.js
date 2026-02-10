import axios from "axios";

// axios 객체 생성 (기본url, 시간 제한, 헤더, 로컬스토리지)
const axiosIns = axios.create({
    baseURL : "http://127.0.0.1:9090/api/v1/",
    timeout : 5000,
    headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials : false 
});

// 요청 형식
axiosIns.interceptors.request.use(
    // 요청에 성공할 경우
    (config) => { 
        // 토큰 가져오기
        const token = localStorage.getItem("accessToken");

        // 로그인 상태일 시 token을 붙여 반환
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 로그인 상태가 아니라면 그냥 반환
        return config;
    },
    
    // 요청에 실패할 경우, 계속 error 객체 반환
    (error) => { return Promise.reject(error); }
);

// 응답 형식
axiosIns.interceptors.response.use(
    // 응답에 성공할 경우
    (response) => {
        return response;
    },

    // 응답에 실패한 경우
    (error) => {
        // 네트워크 오류
        if (!error.response) {
            alert("서버에 연결할 수 없습니다.");
            return Promise.reject(error);
        }
        // 401 (인증 만료 / 토큰 없음)
        else if (error.response.status === 401) {
            alert("로그인이 만료되었습니다.");
            window.location.href = "/auth/login";
        }
        // 403 (권한 없음)
        else if (error.response.status === 403) {
            alert("권한이 없습니다.");
        }
        // 500 (서버 오류)
        else if (error.response.status === 500) {
            alert("서버 오류가 발생하였습니다.");
        }
        // error 반환
        return Promise.reject(error);
    }
);

export default axiosIns; 