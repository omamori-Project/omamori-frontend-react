// components/modals/RegisterModal.jsx
import { useState } from "react";
import { auth } from "../../api/auth.api";

export default function AuthModal({ openModal }) {

    // 이메일, 비밀번호, 검증 비밀번호, 이름 상태 관리
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        name: ""
    });

    // 응답 상태 관리
    const [errors, setErrors] = useState({
        email : "",
        password : "",
        passwordConfirmation : "",
        name : "",
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

        // 에러 객체
        let newErrors = {};

        // 1차 검증
        // 이메일 검사
        if (!formData.email.includes("@")) {
            newErrors.email = "이메일 형식이 올바르지 않습니다.";
        }

        // 비밀번호 검사
        if (formData.password.length < 8) {
            newErrors.password = "비밀번호는 8자 이상이여야 합니다.";
        }

        // 비밀번호 불일치
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "비밀번호가 일치하지 않습니다.";
        }

        // newErrors의 객체 중, 빈 값이 아닌 경우(1차 검증에서 에러가 발생한 경우)
        if (Object.values(newErrors).some(error => error !== "")) {
            setErrors(newErrors);
            return;
        }

        // 서버 전송
        try {
            const result = await auth(formData);
            // openModal("login");
            console.log("성공인 것!! 홀리 쒯!");
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                responseError: error || "회원가입 실패"
            }))
        }
    };

    // 화면 그리기
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}

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

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="비밀번호 확인"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                />
                {errors.password_confirmation && <p>{errors.password_confirmation}</p>}

                <button type="submit">회원가입</button>

                {errors.responseError && <p>{errors.responseError}</p>}
            </form>
        </div>
    );
}