import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const HeadHome = () => {
    const [time, setTime] = useState("");
    const title = [ ['Giáo dục', '#'], ['Thời sự', '#'],
        ['Giáo dục pháp luật', '#'], ['Kết nối', '#'], ['Trao đổi', '#'], ['Học đường', '#'],
        ['Nhân ái', '#'], ['Thế giới', '#'], ['Sức khỏe', '#'], ['Media', '#'], ['Văn Hóa', '#'],['Thể Thao','#']]
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
<<<<<<< HEAD
            const weekday = now.toLocaleString("vi-VN", { weekday: "long" });
            const date = now.toLocaleDateString("vi-VN");
            const timePart = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            });
=======

            const weekday = now.toLocaleString("vi-VN", {weekday: "long"});
            const date = now.toLocaleDateString("vi-VN");
            const timePart = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit", minute: "2-digit",
            }); //

>>>>>>> f75a30e4a261d2fb3495aaea538240b29ac2fcac
            setTime(`${weekday}, ${date} - ${timePart}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
<<<<<<< HEAD
            {/* ================= TOP BAR ================= */}
            <div className="bg-[#f5f5f5] text-xs py-2">
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
=======
            <div>
                <div className={` bg-[#f5f5f5] text-xs pt-2 pb-2 mb-3.5`}>
                    <div className={`container flex gap-3 `}>
                        <div className={`items-center`}>{time}</div>
                        <div className={`flex gap-1`}><img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-phone.svg" alt=""/> Đường dây
                            nóng: <p className={`text-red-900 font-bold`}>0523.713.512</p></div>
                        <div className={`flex gap-1`}><img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/icon-mail.svg"/> Email: <p
                            className={`text-blue-600`}>gdtddlentu@gmail.com</p></div>
                    </div>
                </div>
                <div>
                    <div className={`container`}>
                        <div className={`flex justify-between`}>
                            <div>
                                <img className={`w-40 h-18`}
                                     src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg" alt=""/>
                            </div>
                            <div className={`mt-8 ml-60 flex w-95`}>
                                <button
                                    className={`bg-[#f5f5f5] h-10 w-55 border-gray-300 border rounded-4xl relative left-42`}
                                    disabled></button>
                                <FaSearch className={`relative left-33 top-2`} color={`#c31e40`} size={`20`}/>
                            </div>
                            <div>
                                <img className={`w-18 h-7 mt-9`}
                                     src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/gdtd.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bg-[#c31e40] text-white font-bold text-[14px] mt-3`}>
                    <div className={`container `}>
                        <ul className={`flex justify-between items-center h-10`}>
                            <li><a className={`pt-2 pb-2 pl-1 pr-1`} href=""><FaHome /></a></li>
                            {
                                title.map(([item, value],i) => (
                                    <li key={i}><a className={`pt-2 pb-2 pl-1 pr-1`} href={value}>{item}</a></li>
                                ))
                            }
                        </ul>
>>>>>>> f75a30e4a261d2fb3495aaea538240b29ac2fcac
                    </div>
                </div>
            </div>

            {/* ================= LOGO + SEARCH ================= */}
            <div className="container py-3">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg"
                            alt="Logo"
                            className="w-40"
                        />
                    </Link>

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
                        className="w-20"
                        src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/gdtd.png"
                        alt=""
                    />
                </div>
            </div>

            {/* ================= MENU (DROPDOWN) ================= */}
            <Menu />
        </>
    );
};

export default HeadHome;
