// components/modals/LoginModal.jsx
import { useState } from "react";
import { login } from "../../api/auth.api";

export default function LoginModal({ onClose }) {
    // 이메일, 비밀번호, 검증 비밀번호, 이름 상태 관리
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // 응답 상태 관리
    const [errors, setErrors] = useState({
        email : "",
        password : "",
        responseError : ""
    });

    // 수정 이벤트 처리
    const handleChange = (e) => {
        const { name, value } = e.target; 

        // 기존 값은 유지하면서, 바뀐 값만 덮어씌기
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));
    };

    // 제출 이벤트
    const handleSubmit = async (e) => {
        e.preventDefault(); // 새로고침 방지
        setErrors({email: "", password: "", responseError: ""});

        // 에러 객체
        let newErrors = {};

        // 1차 검증
        // 이메일 검사
        if (!formData.email.trim()) {
            newErrors.email = "이메일을 입력해주세요.";
        }

        // 비밀번호 검사
        if (!formData.password) {
            newErrors.password = "비밀번호를 입력해주세요.";
        }

        // newErrors의 객체 중, 빈 값이 아닌 경우(1차 검증에서 에러가 발생한 경우)
        if (Object.values(newErrors).some(error => error !== "")) {
            setErrors(newErrors);
            return;
        }

        // 서버 전송
        try {
            const result = await login(formData);
            console.log("성공인 것!! 홀리 쒯!");
            onClose();
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                email : error.response?.data?.errors?.email?.[0] || "",
                password : error.response?.data?.errors?.password?.[0] || ""
            }));
        }
    };

    // 화면 그리기
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}

                <button type="submit">로그인</button>

                {errors.responseError && <p>{errors.responseError}</p>}
            </form>
        </div>
    );
}