import { useEffect, useState } from "react";

export const useTheme = () => {
    //
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    //  effect
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const toggleTheme = () => {
        setDark(prev => {
            const next = !prev;
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    };

    return { dark, toggleTheme };
};
