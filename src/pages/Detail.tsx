import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDetail, getRss } from "../services/rssService";
import Comments from "../components/Comments";
import { useAuth } from "../context/AuthContext";
import ArticleHeader from "../components/detail/ArticleHeader";
import ArticleContent from "../components/detail/ArticleContent";
import RelatedArticles from "../components/detail/RelatedArticles";
import TagList from "../components/detail/TagList";
import ForYouSlider from "../components/detail/ForYouSlider";
import VideoAd from "../components/detail/VideoAd";
import SameCategory from "../components/detail/SameCategory";
import FocusNews from "../components/detail/FocusNews";
import HighlightNews from "../components/detail/HighlightNews";
import LatestNews from "../components/detail/LatestNews";

/* ================= TYPES ================= */
interface HotEvent {
    title: string;
    link: string;
}

interface CategoryLink {
    title: string;
    link: string;
}

interface Breadcrumb {
    parent?: CategoryLink | null;
    children?: CategoryLink[];
}

interface RelatedArticle {
    title: string;
    link: string;
    image?: string;
    description?: string;
    thumb?: string;
}

interface FocusNewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface Tag {
    title: string;
    link: string;
}

interface CommentBox {
    articleId: string | null;
    placeholder: string;
    hasMore: boolean;
}

interface SameCategoryItem {
    title: string;
    link: string;
    thumb?: string;
    time?: string;
}

interface HighlightNewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;

    category?: {
        title: string;
        link: string;
    };
}

interface LatestNewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface ArticleDetail {
    title: string;
    author?: string;
    time?: string;
    sapo?: string;
    content: string;
    breadcrumb?: Breadcrumb;
    related?: RelatedArticle[];
    tags?: Tag[];
    hotEvents?: HotEvent[];
    comments?: CommentBox;
    sameCategory?: SameCategoryItem[];
}

/* ================= COMPONENT ================= */
export default function Detail() {
    const [params] = useSearchParams();
    const link = params.get("link");

    const [data, setData] = useState<ArticleDetail | null>(null);
    const [focusNews, setFocusNews] = useState<FocusNewsItem[]>([]);
    const [highlightNews, setHighlightNews] = useState<HighlightNewsItem[]>([]);
    const [latestNews, setLatestNews] = useState<LatestNewsItem[]>([]);
    const [relatedNews, setRelatedNews] = useState<RelatedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user, logout } = useAuth();

    useEffect(() => {
        if (!link) {
            /* eslint-disable react-hooks/set-state-in-effect */
            setError("Không tìm thấy link bài viết");
            setLoading(false);
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setLoading(true);
        setError("");

        getDetail(link)
            .then((res) => {
                if (!res?.content) {
                    setError("Không lấy được nội dung bài viết");
                } else {
                    setData(res);
                }
            })
            .catch(() => setError("Lỗi khi tải bài viết"))
            .finally(() => setLoading(false));
    }, [link]);

    useEffect(() => {
        let mounted = true;

        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list) => {
                if (!mounted) return;

                setFocusNews(list.slice(0, 6));        // Tin tiêu điểm
                setHighlightNews(list.slice(6, 14));   // Tin nổi bật
                setRelatedNews(list.slice(14, 20));    // Dành cho bạn
                setLatestNews(list.slice(20, 30));     // Đừng bỏ lỡ
            })
            .catch(() => {
                if (!mounted) return;

                setFocusNews([]);
                setHighlightNews([]);
                setRelatedNews([]);
                setLatestNews([]);
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <p className="text-center py-10 text-gray-500">
                Đang tải bài viết...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center py-10 text-red-600">
                {error}
            </p>
        );
    }

    if (!data) return null;

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8">

            {/* ================= MAIN CONTENT ================= */}
                <article className="col-span-12 lg:col-span-8 bg-white p-6 rounded shadow">
                    <ArticleHeader data={data} />

                    <ArticleContent html={data.content} />

                    {/* ================= DÀNH CHO BẠN ================= */}
                    <ForYouSlider items={relatedNews} />

                    {/* ================= VIDEO QUẢNG CÁO (MOCK UI) ================= */}
                    <VideoAd />

                    {/* =================  ================= */}
                    <TagList tags={data.tags ?? []} />

                    {/* ================= TIN LIÊN QUAN ================= */}
                    <RelatedArticles items={data.related ?? []} />

                    {/* ===== COMMENTS ===== */}
                    {data.comments && (
                        <section className="mt-10 border-t pt-6">

                            {/* USER BAR */}
                            {user && (
                                <div className="flex items-center justify-between mb-4 p-3 bg-gray-100 rounded">
                <span className="text-sm">
                    👤 Đang đăng nhập: <b>{user.name}</b>
                </span>

                                    <button
                                        onClick={logout}
                                        className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}

                            <Comments articleId={data.comments.articleId ?? "0"} />
                        </section>
                    )}

                    {/* ===== SAME CATEGORY ===== */}
                    <SameCategory items={data.sameCategory ?? []} />

                    {/* ===== TIN TIÊU ĐIỂM ===== */}
                    <FocusNews items={focusNews} />

                    {/* ===== TIN NỔI BẬT ===== */}
                    <HighlightNews items={highlightNews} />

                    {/* ===== ĐỪNG BỎ LỠ ===== */}
                    <LatestNews items={latestNews} />


                </article>
                <aside className="hidden lg:block col-span-4">
                    <div className="sticky top-6 flex flex-col gap-6">

                        {/* ===== BANNER 1 ===== */}
                        <iframe
                            className="w-full h-[600px] border-0 rounded shadow"
                            src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2026-01-07/manhnguyentien/300x600_T1_02_B2/300x600_T1_02_B2/300x600_T1_02_B2.html"
                        />

                        {/* ===== BANNER 2 ===== */}
                        <iframe
                            className="w-full h-[600px] border-0 rounded shadow"
                            src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-7266710804606728&format=300x600"
                        />

                    </div>
                </aside>
            </div>
        </div>
    );
}

