import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRss } from "../services/rssService";
import { menuData } from "../data/menu";
import AdsLeft from "../components/AdsLeft.tsx";
import { CategoryBreadcrumb } from "../components/category/CategoryBreadcrumb.tsx";
import { CategoryHeader } from "../components/category/CategoryHeader.tsx";
import { FeaturedArticle } from "../components/category/FeaturedArticle.tsx";
import { ArticleCard } from "../components/category/ArticleCard.tsx";
import { HighlightNewsSidebar } from "../components/category/HighlightNewsSidebar.tsx";

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

    if (!category) {
        return <p className="text-center py-10">Danh mục không tồn tại</p>;
    }

    const featured = news[0];
    const childCategories = slug
        ? getChildCategories(slug, categoryIndex)
        : [];
    const articleList = news.slice(11);
    const highlightNewsFirst = news.slice(0, 5);
    const highlightNewsSecond = news.slice(5, 11);

    return (
        <div className="mx-auto px-4 container">
            <CategoryBreadcrumb
                parentTitle={parent?.title}
                parentSlug={category.parent}
                currentTitle={category.title}
            />

            <CategoryHeader
                title={category.title}
                childCategories={childCategories}
            />

            {loading && <p>Đang tải...</p>}
            {!loading && news.length === 0 && <p>Không có bài viết</p>}

            <div className="grid grid-cols-[1fr_160px_300px] gap-6">
                {/* ================= CỘT TRÁI ================= */}
                <div>
                    {featured && <FeaturedArticle article={featured} />}
                    <div className="grid gap-6">
                        {articleList.map((item, idx) => (
                            <ArticleCard key={idx} article={item} />
                        ))}
                    </div>
                </div>

                {/* ================= CỘT GIỮA ================= */}
                <div className="flex flex-col gap-6">
                    <HighlightNewsSidebar
                        title="Tin tiêu điểm"
                        articles={highlightNewsFirst}
                    />
                    <HighlightNewsSidebar
                        title="Tin tiêu điểm"
                        articles={highlightNewsSecond}
                        sticky={true}
                    />
                </div>

                {/* ================= CỘT PHẢI ================= */}
                <AdsLeft/>
            </div>
        </div>
    );
}
