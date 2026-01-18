import { useEffect, useState } from "react";
import { getRss } from "../services/rssService";
import Banner from "../Layout/HomeLayout/Banner.tsx";
import { TopNewsSection } from "../components/home/TopNewsSection.tsx";
import { EventSection } from "../components/home/EventSection.tsx";
import { MenuNewsItem } from "../components/home/MenuNewsItem.tsx";

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
    const [menuNews, setMenuNews] = useState<Record<string, NewsItem[]>>({});

    // ===== LẤY TIN TRANG CHỦ =====
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list: any[]) => setNews(list))
            .catch(() => setNews([]));
    }, []);

    /* ===== EVENTS ===== */


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
        <div className="max-w-6xl mx-auto px-4 mt-6 container">
            <TopNewsSection topNews={topNews} />

            <Banner 
                images={[
                    "https://cdn.giaoducthoidai.vn/images/d7e5dade6c26bca1d90c2e8fb2faee186e8524fa74c9062767df0100094b01a1f566b40b5d666d6e9872c56c6b33229d/daihoi-14-pc.png"
                ]}
                className="mb-6 mr-6 ml-6"
            />

            <EventSection topNews={topNews} />


            <div className="menu-news grid grid-cols-1 gap-6">
                {Object.keys(MENU_LIST).map((key) => (
                    <MenuNewsItem
                        key={key}
                        title={MENU_LIST[key].title}
                        rssLink={MENU_LIST[key].rss}
                        articles={menuNews[key] || []}
                    />
                ))}
            </div>
        </div>
    );
}