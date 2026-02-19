// hooks/useModal.js

import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

// Modal 사용
export function useModal() {
    return useContext(ModalContext);
}
