import { createContext, useContext, useState, useEffect } from "react";
import { myPage } from "../api/auth.api";

export const AuthContext = createContext();

// 로그인/로그아웃 상태 관리 컴포넌트
export function AuthProvider({ children }) {

    // 유저 정보 및 로그인 상태
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // 앱 시작 시 유저 상태 저장
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
    
        if (!token) {
            setLoading(false);
            return;
        }

        (async () => {
            // 토큰으로 유저 정보 요청
            try {
                // 유저 정보 요청 후 객체로 저장
                const userData = await myPage(token);
                setUser({
                    id : userData.data.id,
                    email : userData.data.email,
                    name : userData.data.name,
                    role : userData.data.role,
                    is_active : userData.data.is_active
                });
            } catch (error) {
                localStorage.removeItem("accessToken");
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // login 시 
    const login = (userData, token) => {
        localStorage.setItem("accessToken", token);
        setUser({
            id : userData.id,
            email : userData.email,
            name : userData.name,
            role : userData.role,
            is_active : userData.is_active
        });
    }

    // 로그아웃 시
    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    // 이중부정으로 login 상태 관리
    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);