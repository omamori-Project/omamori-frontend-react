import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { googleCallBack } from "../api/auth.api";
import { useRef } from "react";
import { googleLink } from "../api/auth.api";

export default function OAuthSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isLoggedIn } = useAuth();
    // useEffect 리렌더링 방지
    const isRequestSent = useRef(false);

    useEffect(() => {
        // 로그인용 파라미터 찾기 (? 뒤의 값)
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        // 연동용 파라미터 찾기 (# 뒤의 값)
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        const accessToken = hashParams.get("access_token");

        const state = hashParams.get("state");

        if (isLoggedIn == true && state !== "link") {
            navigate("/mypage", { replace: true });
            return; 
        }

        const fetchGoogleLogin = async () => {

            // code 또는 accessToken이 있을 경우, 실행
            if ((code || accessToken) && !isRequestSent.current) {
                isRequestSent.current = true;

                try {
                    if (state === "link" && accessToken) {
                        const response = await googleLink({access_token : accessToken, state : state});
                        alert("구글 연동에 성공하셨습니다. 마이페이지로 이동합니다.");

                    } else {
                        // 백엔드로 code 전달
                        const response = await googleCallBack(code);
                        const { user, token } = response.data;
                        login(user, token);
                    }

                    // 구글에서 마이페이지로 이동
                    navigate("/mypage", { replace: true });

                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        const errorMessage = error.response.data.message;
                        alert(errorMessage); 
                    } 
                    else {
                        alert(state === "link" ? "구글 연동에 실패했습니다." : "구글 로그인에 실패했습니다.");
                    }

                    navigate("/", { replace: true });
                }
            };
        }

        fetchGoogleLogin();
    }, [navigate, login, isLoggedIn]);

    return <div>구글에서 처리 중...</div>;
}
