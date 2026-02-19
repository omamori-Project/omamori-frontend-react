import { createContext, useState } from "react";

// 모달 전역 객체 생성
export const ModalContext = createContext();

// children = APP/
export function ModalProvider({ children }) {

    // ModalProvider의 모달
    const [modal, setModal] = useState(null);

    // type으로 모달 활성화
    const openModal = (type) => setModal(type);

    // 모달 비활성화
    const closeModal = () => setModal(null);

    // 반환
    return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
