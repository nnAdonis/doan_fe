import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRss } from "../services/rssService";
import {useNavigate} from "react-router";
import { menuData } from "../data/menu";
import AdsLeft from "../components/AdsLeft.tsx";

/* ================= MENU / DANH MỤC ================= */
type MenuItem = {
    title: string;
    slug: string;
    children?: MenuItem[];
};

type Category = {
    rss: string;
    title: string;
    parent?: string;
};

function rssFromSlug(slug: string) {
    return `https://giaoducthoidai.vn/rss/${slug}.rss`;
}

function buildCategoryIndex(items: MenuItem[]) {
    const index: Record<string, Category> = {};

    for (const item of items) {
        index[item.slug] = {
            title: item.title,
            rss: rssFromSlug(item.slug),
        };

        for (const child of item.children ?? []) {
            index[child.slug] = {
                title: child.title,
                rss: rssFromSlug(child.slug),
                parent: item.slug,
            };
        }
    }

    return index;
}

const categoryIndex = buildCategoryIndex(menuData as MenuItem[]);

function getChildCategories(slug: string, map: Record<string, Category>) {
    const current = map[slug];
    if (!current) return [];

    const parentKey = current.parent ?? slug;

    return Object.entries(map)
        .filter(([key, item]) => {
            if (item.parent !== parentKey) return false;
            if (current.parent && key === slug) return false;
            return true;
        })
        .map(([key, item]) => ({
            key,
            ...item,
        }));
}

export function Category() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const category = slug ? categoryIndex[slug] : null;
    const parent = category?.parent
        ? categoryIndex[category.parent]
        : null;

    useEffect(() => {
        if (!category) {
            setNews([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        getRss(category.rss)
            .then(setNews)
            .finally(() => setLoading(false));
    }, [slug]);
    const featured = news[0];

    console.log(news)
    if (!category) {
        return <p className="text-center py-10">Danh mục không tồn tại</p>;
    }

    const childCategories = slug
        ? getChildCategories(slug, categoryIndex)
        : [];

    return (
            <div className=" mx-auto px-4 container">
                {/* ===== BREADCRUMB ===== */}
                <div className="mb-4 text-sm text-gray-600">
                    {parent && (
                        <>
                            <Link to={`/category/${category.parent}`} className="hover:underline text-[20px] font-bold">
                                {parent.title}
                            </Link>
                            <span className="mx-2">›</span>
                        </>
                    )}
                    <span className="font-semibold">{category.title}</span>
                </div>

                {/* ===== TITLE ===== */}
                {category && (
                    <div className='flex space-x-3 '>
                        <h1 className="text-2xl font-bold mb-6 border-l-4 border-red-700 pl-3">
                            {category.title}
                        </h1>

                        <ul className="flex gap-3 relative top-1.5">
                            {childCategories.map((item) => (
                                <li key={item.key} onClick={() => navigate(`/category/${item.key}`)} className="cursor-pointer hover:text-red-600">
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {loading && <p>Đang tải...</p>}
                {!loading && news.length === 0 && <p>Không có bài viết</p>}

                <div className="grid grid-cols-[1fr_160px_300px] gap-6">

                    {/* ================= CỘT TRÁI ================= */}
                    <div>
                        {/* ===== LIST ===== */}
                        {featured && (
                            <article className="mb-6">
                                <Link to={`/detail?link=${encodeURIComponent(featured.link)}`} className="block">
                                    {featured.image && (
                                        <img src={featured.image} alt={featured.title} className="w-full h-[360px] object-cover rounded"/>
                                    )}

                                    <h2 className="mt-4 text-xl font-bold leading-snug hover:text-red-700 transition">
                                        {featured.title}
                                    </h2>
                                </Link>
                            </article>
                        )}
                        <div className="grid gap-6">
                            {news.slice(11,).map((item, idx) => (
                                <article key={idx} className="grid grid-cols-[240px_1fr] gap-2  ">
                                    <Link to={`/detail?link=${encodeURIComponent(item.link)}`} className="block">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full object-cover rounded hover:scale-105 transition"/>
                                        ) : (
                                            <div className="w-full h-20 bg-gray-200"/>
                                        )}
                                    </Link>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-semibold text-sm line-clamp-2">
                                            <Link to={`/detail?link=${encodeURIComponent(item.link)}`} className="hover:text-red-700">
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

                    {/* ================= CỘT GIỮA ================= */}
                    <div className={` flex flex-col gap-6`}>
                        <aside>
                            <h2 className="font-semibold text-lg border-l-4 border-red-700 pl-3 mb-2 bg-[#f5f5f5]">
                                Tin tiêu điểm
                            </h2>

                            <div className="flex flex-col gap-4">
                                {news.slice(0, 5).map((item, idx) => (
                                    <article key={idx} className="flex flex-col gap-1">
                                        <img src={item.image} alt={item.title} className="object-cover rounded"
                                        />
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            <Link to={`/detail?link=${encodeURIComponent(item.link)}`} className="hover:text-red-700">
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </aside>
                        <aside className={`top-4 self-start sticky`}>
                            <h2 className="  font-semibold text-lg border-l-4 border-red-700 pl-3 mb-2 bg-[#f5f5f5]">
                                Tin tiêu điểm
                            </h2>

                            <div className="flex flex-col gap-4">
                                {news.slice(5, 11).map((item, idx) => (
                                    <article key={idx} className="flex flex-col gap-1">
                                        <img src={item.image} alt={item.title} className="object-cover rounded"/>
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            <Link to={`/detail?link=${encodeURIComponent(item.link)}`} className="hover:text-red-700">
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>

                        </aside>
                    </div>
                    {/* ================= CỘT PHẢI ================= */}
                    <AdsLeft/>
                </div>
            </div>
    );
}
