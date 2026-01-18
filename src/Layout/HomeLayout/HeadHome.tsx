import {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import Menu from "./Menu";
import {useTheme} from "../../hooks/useTheme";
import {VoiceSearchButton} from "../../components/VoiceSearchButton";


const HeadHome = () => {
    const [time, setTime] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const {dark, toggleTheme} = useTheme();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const weekday = now.toLocaleString("vi-VN", {weekday: "long"});
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
                        <img src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-phone.svg"
                            alt=""/>
                        Đường dây nóng:
                        <span className="text-red-900 font-bold ml-1">
                            0523.713.512
                        </span>
                    </div>

                    <div className="flex gap-1 items-center">
                        <img src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-mail.svg"
                            alt=""/>
                        Email:
                        <span className="text-blue-600 ml-1">
                            gdtddlentu@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= LOGO + SEARCH ================= */}
            <div className="container py-3 mt-4  m-4">
                <div className="flex justify-between">
                    <Link to="/">

                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg"
                            alt="Logo"
                            className="w-40"
                        />

                    </Link>
                    <div className={`flex justify-end items-center gap-5 pt-5`}>
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

                        <img src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg" alt="Logo"
                             className="w-40"/>
                    </Link>
                    <div className={`flex justify-end items-end gap-5 pt-5`}>
                        <div className="relative flex items-center gap-2">
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                   onKeyDown={handleKeyDown}
                                   placeholder="Tìm kiếm..."
                                   className="bg-[#f5f5f5] h-10 w-56 border border-gray-300 rounded-full pl-4 pr-20 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                            <div className="absolute right-2 flex items-center gap-1">
                                <VoiceSearchButton
                                    onTranscript={(text) => {
                                        setSearchQuery(text);
                                        // Tự động tìm kiếm sau khi nhận được transcript
                                        setTimeout(() => {
                                            navigate(`/search?q=${encodeURIComponent(text.trim())}`);
                                        }, 300);
                                    }}
                                />
                                <FaSearch onClick={handleSearch} className="cursor-pointer hover:scale-110 transition-transform"
                                          color="#c31e40" size={18}/>
                            </div>
                        </div>

                        <img className="w-20 h-7" src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/gdtd.png"
                             alt=""/>
                    </div>

                </div>


                {/* DARK / LIGHT BUTTON */}
                <header className="header">
                    <button onClick={toggleTheme}>
                <button
                    onClick={toggleTheme}
                    className="text-xl w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
                    title="Chuyển Dark / Light">
                    {dark ? "☀️" : "🌙"}
                </button>


                </header>

            </div>

            {/* ================= MENU (DROPDOWN) ================= */}
            <Menu/>
        </>

    );


};


export default HeadHome;
