// context/FortuneContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const FortuneContext = createContext();

export function FortuneProvider({ children }) {
    // activeColor를 객체 기본 흰 색으로 관리
    const [activeColor, setActiveColor] = useState({ hex : localStorage.getItem("activeFortuneColor") || "#FFFFFF" });

    useEffect(() => {
        localStorage.setItem("activeFortuneColor", activeColor.hex);
    }, [activeColor]);

    return (
        <FortuneContext.Provider value={{ setActiveColor }}>
            <div style={{ 
                backgroundColor: activeColor.hex, 
                transition: 'background-color 0.5s ease', 
                minHeight: '100vh' 
            }}>
                {children}
            </div>
        </FortuneContext.Provider>
    );
}

export const useFortune = () => useContext(FortuneContext);