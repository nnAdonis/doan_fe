import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useTheme } from "../../hooks/useTheme";


const HeadHome = () => {
    const [time, setTime] = useState("");
    const { dark, toggleTheme } = useTheme();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const weekday = now.toLocaleString("vi-VN", { weekday: "long" });
            const date = now.toLocaleDateString("vi-VN");
            const timePart = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(`${weekday}, ${date} - ${timePart}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* ================= TOP BAR ================= */}
            <div className="bg-[#f5f5f5] text-xs py-2 ">
                <div className="container flex gap-6 items-center">
                    <div>{time}</div>

                    <div className="flex gap-1 items-center">
                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-phone.svg"
                            alt=""
                        />
                        Đường dây nóng:
                        <span className="text-red-900 font-bold ml-1">
                            0523.713.512
                        </span>
                    </div>

                    <div className="flex gap-1 items-center">
                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-mail.svg"
                            alt=""
                        />
                        Email:
                        <span className="text-blue-600 ml-1">
                            gdtddlentu@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= LOGO + SEARCH ================= */}
            <div className="container py-3 mt-4 m-4">
                <div className="flex justify-between">
                    <Link to="/">
                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg"
                            alt="Logo"
                            className="w-40"
                        />
                    </Link>
                    <div className={`flex justify-end items-end gap-5 pt-5`}>
                        <div className="relative">
                            <input
                                disabled
                                className="bg-[#f5f5f5] h-10 w-56 border border-gray-300 rounded-full pl-4"
                            />
                            <FaSearch
                                className="absolute right-4 top-2.5"
                                color="#c31e40"
                                size={18}
                            />
                        </div>

                        <img
                            className="w-20 h-7"
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/gdtd.png"
                            alt=""
                        />
                    </div>
                </div>


                {/* DARK / LIGHT BUTTON */}
                <header className="header">
                    <button onClick={toggleTheme}>
                        {dark ? "☀️" : "🌙"}
                    </button>

                    <input className="search-input" />
                </header>

            </div>

            {/* ================= MENU (DROPDOWN) ================= */}
            <Menu />
        </>
    );
};

export default HeadHome;
