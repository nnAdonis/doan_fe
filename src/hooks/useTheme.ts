import { useEffect, useState } from "react";

export const useTheme = () => {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return {
        dark,
        toggleTheme: () => setDark(d => !d),
    };
};
