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
    
    // 요청에 실패할 경우
    (error) => {
        if() {

        }
        else if() {

        }
    }
);

// 응답 형식
axiosIns.interceptors.response.use(

);

export api 