import { useEffect, useState } from "react";
import { getRss } from "../services/rssService";
import SidebarBoxLarge from "./SidebarBoxLarge";

/* ================= TYPES ================= */
export interface NewsItem {
    title: string;
    link: string;
    image?: string;
}

/* ================= COMPONENT ================= */
export default function SidebarMiddle() {
    const [focusNews, setFocusNews] = useState<NewsItem[]>([]);
    const [highlightNews, setHighlightNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        // Tin tiêu điểm – 5 bài
        getRss("https://giaoducthoidai.vn/rss/the-thao.rss")
            .then(data => setFocusNews(data.slice(0, 8)));

        // Tin nổi bật – 5 bài
        getRss("https://giaoducthoidai.vn/rss/van-hoa.rss")
            .then(data => setHighlightNews(data.slice(0, 8)));
    }, []);

    return (
        <aside className="space-y-12">

            {/* ===== TIN TIÊU ĐIỂM (KHÔNG STICKY) ===== */}
            <SidebarBoxLarge
                title="Tin tiêu điểm"
                data={focusNews}
            />

            {/* ===== TIN NỔI BẬT (STICKY – XUẤT HIỆN CHẬM TỰ NHIÊN) ===== */}
            <div className="sticky top-20">
                <SidebarBoxLarge
                    title="Tin nổi bật"
                    data={highlightNews}
                />
            </div>

        </aside>
    );
}
