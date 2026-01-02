import {useEffect, useState} from "react";
import {FaHome, FaSearch} from "react-icons/fa";

const HeadHome = () => {
    const [time, setTime] = useState("");
    const title = [ ['Giáo dục', '#'], ['Thời sự', '#'],
        ['Giáo dục pháp luật', '#'], ['Kết nối', '#'], ['Trao đổi', '#'], ['Học đường', '#'],
        ['Nhân ái', '#'], ['Thế giới', '#'], ['Sức khỏe', '#'], ['Media', '#'], ['Văn Hóa', '#'],['Thể Thao','#']]
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();

            const weekday = now.toLocaleString("vi-VN", {weekday: "long"});
            const date = now.toLocaleDateString("vi-VN");
            const timePart = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit", minute: "2-digit",
            }); //

            setTime(`${weekday}, ${date} - ${timePart}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (

        <>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeadHome