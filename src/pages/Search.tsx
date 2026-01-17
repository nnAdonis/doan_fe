import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getRss } from "../services/rssService";
import { menuData } from "../data/menu";
import AdsLeft from "../components/AdsLeft.tsx";

/* ================= MENU / DANH MỤC ================= */
type MenuItem = {
    title: string;
    slug: string;
    children?: MenuItem[];
};

function rssFromSlug(slug: string) {
    return `https://giaoducthoidai.vn/rss/${slug}.rss`;
}

// Hàm loại bỏ dấu tiếng Việt để tìm kiếm không phân biệt có dấu/không dấu
function removeVietnameseDiacritics(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

function getAllSlugs(items: MenuItem[]): string[] {
    const slugs: string[] = [];
    
    console.log("getAllSlugs - items:", items);
    
    for (const item of items) {
        if (item && item.slug) {
            slugs.push(item.slug);
            if (item.children && Array.isArray(item.children)) {
                for (const child of item.children) {
                    if (child && child.slug) {
                        slugs.push(child.slug);
                    }
                }
            }
        }
    }
    
    console.log("getAllSlugs - result:", slugs);
    return slugs;
}

export function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [news, setNews] = useState<any[]>([]);
    const [filteredNews, setFilteredNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        // Lấy tất cả slugs từ menuData
        const allSlugs = getAllSlugs(menuData as MenuItem[]);
        console.log("allSlugs", allSlugs);
        
        // Lấy RSS từ tất cả các slug trong menuData
        const rssUrls = allSlugs.map(slug => rssFromSlug(slug));
        console.log("rssUrls", rssUrls);
        
        // Gọi getRss cho tất cả các RSS feeds và gộp kết quả
        Promise.all(rssUrls.map(url => getRss(url)))
            .then(results => {
                // Gộp tất cả bài viết lại
                const allNews = results.flat();
                
                // Loại bỏ các bài viết trùng lặp dựa vào link
                const uniqueNews = Array.from(
                    new Map(allNews.map(item => [item.link, item])).values()
                );
                
                setNews(uniqueNews);
            })
            .catch(error => {
                console.error("Error fetching RSS:", error);
                setNews([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Lọc bài báo theo query khi query hoặc news thay đổi
    useEffect(() => {
        if (!query.trim()) {
            setFilteredNews(news);
            return;
        }

        const normalizedQuery = removeVietnameseDiacritics(query);

        const filtered = news.filter(item => {
            if (!item.title) return false;
            // Tìm kiếm không phân biệt hoa thường và không phân biệt có dấu/không dấu
            const normalizedTitle = removeVietnameseDiacritics(item.title);
            return normalizedTitle.includes(normalizedQuery);
        });

        setFilteredNews(filtered);
    }, [query, news]);

    return (
        <div className={`container`}>
            <div className=" px-4 mt-6 grid grid-cols-[1fr_300px] gap-4 ">
                <div>
                    <h1 className="mb-4 font-semibold">
                        {query ? `Kết quả tìm kiếm "${query}": ${filteredNews.length} bài viết` : `Có ${news.length} bài viết`}
                    </h1>

                    {loading && <p>Đang tải...</p>}
                    {!loading && query && filteredNews.length === 0 && (
                        <p>Không tìm thấy bài viết nào với từ khóa "{query}"</p>
                    )}
                    {!loading && !query && news.length === 0 && <p>Không có bài viết</p>}

                    <div className="flex">
                        <div className="flex-1">
                            {/* ===== LIST ===== */}
                            <div className="grid gap-6">
                                {(query ? filteredNews : news).map((item, idx) => (
                                    <article key={idx} className="grid grid-cols-[240px_1fr] gap-4">
                                        <Link to={`/detail?link=${encodeURIComponent(item.link)}`} className="block">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title}
                                                    className="w-full h-[140px] object-cover rounded hover:scale-105 transition"/>
                                            ) : (
                                                <div className="w-full h-[140px] bg-gray-200 rounded" />
                                            )}
                                        </Link>

                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-semibold text-sm line-clamp-2">
                                                <Link to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                      className="hover:text-red-700">
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            {item.time && (
                                                <time className="text-xs text-gray-500">
                                                    {item.time}
                                                </time>
                                            )}

                                            {item.summary && (
                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                    {item.summary}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <AdsLeft/>
            </div>
        </div>
    );
}
