import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getRss } from "../services/rssService";
import { menuData } from "../data/menu";
import AdsLeft from "../components/AdsLeft.tsx";

type MenuItem = {
    title: string;
    slug: string;
    children?: MenuItem[];
};

function rssFromSlug(slug: string) {
    return `https://giaoducthoidai.vn/rss/${slug}.rss`;
}

function removeVietnameseDiacritics(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

function getAllSlugs(items: MenuItem[]): string[] { // lấy toàn bộ nguồn bài viết
    const slugs: string[] = [];
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

        const allSlugs = getAllSlugs(menuData as MenuItem[]);

        const rssUrls = allSlugs.map(slug => rssFromSlug(slug));
        Promise.all(rssUrls.map(url => getRss(url)))
            .then(results => {
                const allNews = results.flat();
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

    useEffect(() => {
        if (!query.trim()) {
            setFilteredNews(news);
            return;
        }

        const normalizedQuery = removeVietnameseDiacritics(query);

        const filtered = news.filter(item => {
            if (!item.title) return false;
            const normalizedTitle = removeVietnameseDiacritics(item.title);
            return normalizedTitle.includes(normalizedQuery);
        });

        setFilteredNews(filtered);
    }, [query, news]);

    return (
        <div className={`container`}>
            <div className="px-4 mt-6 grid grid-cols-[1fr_300px] gap-4 ">
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
