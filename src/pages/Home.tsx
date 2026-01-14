import { useEffect, useState } from "react";
import { getRss } from "../services/rssService";
import { Link } from "react-router-dom";
import Banner from "../Layout/HomeLayout/Banner.tsx";
import TableNew from "../components/TableNew.tsx";
import RecommendationBox from "../components/RecommendationBox.tsx";

// ===== TYPES =====
interface NewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

// ===== 12 MENU =====
const MENU_LIST: Record<string, { rss: string; title: string }> = {
    "giao-duc": { rss: "https://giaoducthoidai.vn/rss/giao-duc.rss", title: "Giáo dục" },
    "thoi-su": { rss: "https://giaoducthoidai.vn/rss/thoi-su.rss", title: "Thời sự" },
    "phap-luat-phap-luat": { rss: "https://giaoducthoidai.vn/rss/phap-luat-phap-luat.rss", title: "Giáo dục pháp luật" },
    "ket-noi": { rss: "https://giaoducthoidai.vn/rss/ket-noi.rss", title: "Kết nối" },
    "trao-doi": { rss: "https://giaoducthoidai.vn/rss/trao-doi.rss", title: "Trao đổi" },
    "hoc-duong": { rss: "https://giaoducthoidai.vn/rss/hoc-duong.rss", title: "Học đường" },
    "nhan-ai": { rss: "https://giaoducthoidai.vn/rss/nhan-ai.rss", title: "Nhân ái" },
    "the-gioi": { rss: "https://giaoducthoidai.vn/rss/the-gioi.rss", title: "Thế giới" },
    "suc-khoe": { rss: "https://giaoducthoidai.vn/rss/suc-khoe.rss", title: "Sức khỏe" },
    "video-media": { rss: "https://giaoducthoidai.vn/rss/video-media.rss", title: "Media" },
    "van-hoa": { rss: "https://giaoducthoidai.vn/rss/van-hoa.rss", title: "Văn hóa" },
    "the-thao": { rss: "https://giaoducthoidai.vn/rss/the-thao.rss", title: "Thể thao" },
};

// ===== COMPONENT =====
export default function Home() {
    const [news, setNews] = useState<NewsItem[]>([]);
    // const [hotEvents, setHotEvents] = useState<HotEvent[]>([]);
    const [events, setEvents] = useState<{ title: string; link: string }[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [menuNews, setMenuNews] = useState<Record<string, NewsItem[]>>({});

    // ===== LẤY TIN TRANG CHỦ =====
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list: any[]) => setNews(list))
            .catch(() => setNews([]));
    }, []);

    /* ===== EVENTS ===== */
    useEffect(() => {
        fetch("http://localhost:3000/api/events")
            .then(res => res.json())
            .then(setEvents)
            .finally(() => setLoadingEvents(false));
    }, []);

    // ===== LẤY TIN 12 MENU =====
    useEffect(() => {
        const fetchMenu = async () => {
            const data: Record<string, NewsItem[]> = {};
            for (const key in MENU_LIST) {
                try {
                    const rssData = await getRss(MENU_LIST[key].rss);
                    data[key] = rssData.slice(0, 5); // 1 bài lớn + 4 bài nhỏ
                } catch {
                    data[key] = [];
                }
            }
            setMenuNews(data);
        };
        fetchMenu();
    }, []);

    const topNews = news.slice(0, 5); // 1 bài lớn + 4 bài nhỏ

    return (
        <div className="max-w-6xl mx-auto px-4 mt-6">
            {/* ===== SỰ KIỆN ===== */}
            {loadingEvents ? (
                <div className="text-gray-500 text-sm italic">
                    Đang tải sự kiện...
                </div>
            ) : events.length > 0 ? (
                <div className="event-wrapper mb-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold text-red-700 whitespace-nowrap">
                            Sự kiện
                        </h3>

                        <div className="event-slide overflow-hidden w-full">
                            <ul className="event-track flex gap-8">
                                {[...events, ...events].map((e, i) => (
                                    <li key={i} className="whitespace-nowrap">
                                        <Link
                                            to={`/chu-de?link=${encodeURIComponent(
                                                e.link
                                            )}`}
                                            className="font-semibold text-blue-700 hover:underline"
                                        >
                                            #{e.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* ===== HOTNEWS / TIN NỔI BẬT ===== */}
            <div className="abf-homepage mb-8">
                <div className="top-news grid grid-cols-1 md:grid-cols-[4.5fr_1fr] gap-6 mb-6">
                    {topNews[0] && (
                        <div className="rank-1 ">
                            <article className="story grid grid-cols-[1fr_260px] gap-[20px] ">
                                <figure className="story__thumb overflow-hidden ">
                                    <Link to={`/detail?link=${encodeURIComponent(topNews[0].link)}`}>
                                        {topNews[0].image ? (
                                            <img
                                                src={topNews[0].image}
                                                alt={topNews[0].title}
                                                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-80 bg-gray-200" />
                                        )}
                                    </Link>
                                </figure>
                                <div>
                                    <h2 className="story__heading text-2xl font-bold leading-snug line-clamp-3">
                                        <Link
                                            to={`/detail?link=${encodeURIComponent(topNews[0].link)}`}
                                            className="hover:text-red-700 transition-colors"
                                        >
                                            {topNews[0].title}
                                        </Link>
                                    </h2>
                                    {topNews[0].time && (
                                        <time className="story__time text-sm text-gray-500 mt-1 block">{topNews[0].time}</time>
                                    )}
                                    {topNews[0].summary && (
                                        <div className="story__summary text-gray-600 mt-2 line-clamp-4">
                                            <p>{topNews[0].summary}</p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        </div>
                    )}

                    {/* Banner quảng cáo */}
                    <div className="rank-2 hidden md:flex flex-col gap-4">
                        <div className="banner bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                            <a href="/epaper/" target="_blank">
                                <img
                                    src="https://cdn.giaoducthoidai.vn/images/df6357f0e2dcb343ab463ca30a52a8b2fe20a926d2110a752ee56e08d9a7d2edd84ba235097c0affb7644db7301c1301/banner-baoin.png"
                                    alt="Web: Đọc báo giấy"
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 4 bài nhỏ */}
                <div className="blog-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topNews.slice(1, 6).map((item, idx) => (
                        <article
                            key={idx}
                            className="story flex flex-col border border-transparent hover:border-red-500 rounded-lg transition-all duration-300"
                        >
                            <figure className="story__thumb overflow-hidden rounded-t-lg">
                                <Link to={`/detail?link=${encodeURIComponent(item.link)}`} title={item.title}>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-200" />
                                    )}
                                </Link>
                            </figure>
                            <h2 className="story__heading text-sm font-medium mt-1 line-clamp-2 px-2">
                                <Link
                                    to={`/detail?link=${encodeURIComponent(item.link)}`}
                                    className="hover:text-red-700 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            </h2>
                        </article>
                    ))}
                </div>
            </div>



            <Banner images={[
                "https://cdn.giaoducthoidai.vn/images/d7e5dade6c26bca1d90c2e8fb2faee186e8524fa74c9062767df0100094b01a1f566b40b5d666d6e9872c56c6b33229d/daihoi-14-pc.png"
            ]}
                className={`mb-6 mr-6 ml-6`}
            />

            {/* ===== HOTNEWS / TIN NỔI BẬT ===== */}
            <div className={`grid grid-cols-[3fr_1fr] gap-6`}>
                <div >
                    <div className="box-heading mb-3">
                        <h3 className="wrap-heading text-lg text-[#c31e40] font-bold flex gap-2">
                            Toàn Cảnh - Sự Kiện
                            <div className="flex-1 border-b border-[#c31e40] relative bottom-[8px]"></div>
                        </h3>
                    </div>
                    <div className="abf-homepage mb-8 ">
                        <div className="top-news grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 mb-6">
                            {topNews[0] && (
                                <div className="rank-1 ">
                                    <article className="story flex flex-col gap-[20px] ">
                                        <figure className="story__thumb overflow-hidden ">
                                            <Link to={`/detail?link=${encodeURIComponent(topNews[0].link)}`}>
                                                {topNews[0].image ? (
                                                    <img
                                                        src={topNews[0].image}
                                                        alt={topNews[0].title}
                                                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-80 bg-gray-200" />
                                                )}
                                            </Link>
                                        </figure>
                                        <div>
                                            <h2 className="story__heading text-2xl font-bold leading-snug line-clamp-3">
                                                <Link
                                                    to={`/detail?link=${encodeURIComponent(topNews[0].link)}`}
                                                    className="hover:text-red-700 transition-colors"
                                                >
                                                    {topNews[0].title}
                                                </Link>
                                            </h2>
                                            {topNews[0].time && (
                                                <time className="story__time text-sm text-gray-500 mt-1 block">{topNews[0].time}</time>
                                            )}
                                            {topNews[0].summary && (
                                                <div className="story__summary text-gray-600 mt-2 line-clamp-4">
                                                    <p>{topNews[0].summary}</p>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                </div>
                            )}


                            <div className="blog-list flex flex-col  gap-4">
                                {topNews.slice(1, 6).map((item, idx) => (
                                    <article
                                        key={idx}
                                        className="story gird border border-transparent hover:border-red-500  transition-all duration-300"
                                    >
                                        <figure className="story__thumb overflow-hidden ">
                                            <Link to={`/detail?link=${encodeURIComponent(item.link)}`} title={item.title}>
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-20 object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-200" />
                                                )}
                                            </Link>
                                        </figure>
                                        <h2 className="story__heading text-[14px] font-medium mt-1 line-clamp-2 px-2">
                                            <Link
                                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                className="hover:text-red-700 transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </h2>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <TableNew/>
                    <RecommendationBox/>
                </div>
            </div>


            {/* ===== 12 MENU ===== */}
            <div className="menu-news grid grid-cols-1 gap-6">
                {Object.keys(MENU_LIST).map((key) => {
                    const articles = menuNews[key] || [];
                    const top = articles[0];
                    const subs = articles.slice(1, 5);

                    return (
                        <div key={key} className="onemain-foursub">
                            <div className="box-heading mb-3 mt-4">
                                <h3 className="wrap-heading text-lg text-[#c31e40] font-bold flex gap-2">
                                    <Link
                                        className="heading "
                                        to={`/chu-de?link=${encodeURIComponent(MENU_LIST[key].rss)}`}
                                    >
                                        {MENU_LIST[key].title}
                                    </Link>
                                    <div className="flex-1 border-b border-[#c31e40] relative bottom-[8px]"></div>
                                </h3>

                            </div>

                            <div className="box-content grid grid-cols-1 md:grid-cols-[3fr_3fr] gap-8">
                                {top && (
                                    <div className="item-primary">
                                        <article className="story flex flex-col">
                                            <figure className="story__thumb overflow-hidden rounded-lg">
                                                <Link to={`/detail?link=${encodeURIComponent(top.link)}`}>
                                                    {top.image ? (
                                                        <img
                                                            src={top.image}
                                                            alt={top.title}
                                                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-64 bg-gray-200" />
                                                    )}
                                                </Link>
                                            </figure>
                                            <h3 className="story__heading mt-2 text-base font-semibold line-clamp-2">
                                                <Link
                                                    to={`/detail?link=${encodeURIComponent(top.link)}`}
                                                    className="hover:text-red-700 transition-colors"
                                                >
                                                    {top.title}
                                                </Link>
                                            </h3>
                                            {top.time && (
                                                <time className="story__time text-sm text-gray-500 mt-1 block">{top.time}</time>
                                            )}
                                            {top.summary && (
                                                <div className="story__summary text-gray-600 mt-1 line-clamp-3">
                                                    <p>{top.summary}</p>
                                                </div>
                                            )}
                                        </article>
                                    </div>
                                )}

                                <div className="item-secondary grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {subs.map((sub, idx) => (
                                        <article
                                            key={idx}
                                            className="story flex flex-col border border-transparent hover:border-red-500 rounded-lg transition-all duration-300"
                                        >
                                            <figure className="story__thumb overflow-hidden rounded-t-lg">
                                                <Link to={`/detail?link=${encodeURIComponent(sub.link)}`}>
                                                    {sub.image ? (
                                                        <img
                                                            src={sub.image}
                                                            alt={sub.title}
                                                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-200" />
                                                    )}
                                                </Link>
                                            </figure>
                                            <h3 className="story__heading text-sm font-medium mt-1 line-clamp-2 px-2">
                                                <Link
                                                    to={`/detail?link=${encodeURIComponent(sub.link)}`}
                                                    className="hover:text-red-700 transition-colors"
                                                >
                                                    {sub.title}
                                                </Link>
                                            </h3>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
