import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getDetail, getRss } from "../services/rssService";
import { getSlugFromUrl } from "../utils/getSlugFromUrl";

/* ================= TYPES ================= */
interface RelatedArticle {
    title: string;
    link: string;
    image?: string;
    description?: string;
    thumb?: string;
}

interface CategoryLink {
    title: string;
    link: string;
}

interface FocusNewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface Breadcrumb {
    parent?: CategoryLink | null;
    children?: CategoryLink[];
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

interface HotEvent {
    title: string;
    link: string;
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

    useEffect(() => {
        if (!link) {
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

    /* ===== LOAD TIN TIÊU ĐIỂM ===== */
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list) => {
                setFocusNews(list.slice(0, 6));
            })
            .catch(() => {
                setFocusNews([]);
            });
    }, []);

    /* ===== LOAD TIN NỔI BẬT ===== */
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list) => {
                // Tin nổi bật lấy nhiều hơn tin tiêu điểm
                setHighlightNews(list.slice(6, 14));
            })
            .catch(() => {
                setHighlightNews([]);
            });
    }, []);

    /* ===== LOAD ĐỪNG BỎ LỠ ===== */
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list) => {
                // lấy sâu hơn để không trùng tin nổi bật
                setLatestNews(list.slice(20, 30));
            })
            .catch(() => setLatestNews([]));
    }, []);

    /* ===== LOAD DÀNH CHO BẠN ===== */
    useEffect(() => {
        getRss("https://giaoducthoidai.vn/rss/home.rss")
            .then((list) => {
                // Lấy 6 bài đầu tiên làm “Dành cho bạn”
                setRelatedNews(list.slice(14, 20));
            })
            .catch(() => setRelatedNews([]));
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
        <article className="max-w-4xl mx-auto bg-white p-6 shadow rounded">

            {/* HOT EVENTS */}
            {data.hotEvents && data.hotEvents.length > 0 && (
                <div className="hot-events mb-6">
                    {/* HEADER */}
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-red-700 uppercase whitespace-nowrap">
                            Sự kiện
                        </h3>
                        <div className="overflow-x-auto flex gap-6 scrollbar-hide py-1">
                            {data.hotEvents.map((e, idx) => (
                                <Link
                                    key={idx}
                                    to={`/chu-de?link=${encodeURIComponent(e.link)}`}
                                    className="text-blue-700 hover:underline whitespace-nowrap font-semibold"
                                >
                                    #{e.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {/* BREADCRUMB */}
            {data.breadcrumb?.parent && (
                <div className="cate-breadcrumb mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {/* CATEGORY PARENT */}
                    <Link
                        to={`/category/${getSlugFromUrl(data.breadcrumb.parent.link)}`}
                        className="text-xl font-bold text-red-700 hover:underline whitespace-nowrap"
                    >
                        {data.breadcrumb.parent.title}
                    </Link>

                    {/* CATEGORY CHILDREN */}
                    {data.breadcrumb.children && (
                        <ul className="flex flex-wrap items-center gap-x-4">
                            {data.breadcrumb.children.map((child, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/category/${getSlugFromUrl(child.link)}`}
                                        className="text-base font-semibold text-gray-700 hover:text-red-700 whitespace-nowrap"
                                    >
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ===== TITLE ===== */}
            <h1 className="text-3xl font-bold mb-3 leading-snug">
                {data.title}
            </h1>

            {/* ===== META ===== */}
            {(data.author || data.time) && (
                <div className="text-sm text-gray-500 mb-4">
                    {data.author && <span>{data.author}</span>}
                    {data.author && data.time && " • "}
                    {data.time && <span>{data.time}</span>}
                </div>
            )}

            {/* ===== SAPO ===== */}
            {data.sapo && (
                <div
                    className="text-lg font-medium text-gray-700 mb-6"
                    dangerouslySetInnerHTML={{ __html: data.sapo }}
                />
            )}

            {/* ===== CONTENT ===== */}
            <div
                className="article-content prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />

            {/* ================= DÀNH CHO BẠN ================= */}
            {relatedNews.length > 0 && (
                <section className="mt-12 border-t pt-4">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-red-700 uppercase">Dành cho bạn</h3>
                        <span className="text-xs text-gray-400">Sponsored</span>
                    </div>

                    {/* SLIDE WRAPPER */}
                    <div className="overflow-x-auto flex gap-4 scrollbar-hide py-2">
                        {relatedNews.map((item, idx) => (
                            <Link
                                key={idx}
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="flex-shrink-0 w-[300px] group bg-white rounded shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {/* IMAGE */}
                                <div className="w-full h-40 overflow-hidden rounded-t">
                                    <img
                                        src={item.image || "https://via.placeholder.com/300x160?text=No+Image"}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="p-3 flex flex-col gap-1">
                                    <span className="text-xs text-gray-500">giaoducthoidai.vn</span>
                                    <h4 className="text-sm font-semibold leading-snug group-hover:text-red-700 line-clamp-2">
                                        {item.title}
                                    </h4>
                                    {item.description && (
                                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ================= VIDEO QUẢNG CÁO (MOCK UI) ================= */}
            <section className="mt-12">
                <div className="border rounded p-4 bg-gray-100">
                    <p className="text-sm text-gray-500 mb-2 uppercase">
                        Quảng cáo
                    </p>

                    <div className="aspect-video bg-black rounded overflow-hidden">
                        <video
                            controls
                            muted
                            poster="https://via.placeholder.com/640x360?text=Video+Advertisement"
                            className="w-full h-full object-cover"
                        >
                            <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 text-right">
                        Powered by DemoAds
                    </p>
                </div>
            </section>

            {/* ===== TAGS ===== */}
            {data.tags && data.tags.length > 0 && (
                <section className="mt-10 border-t pt-6">
                    {/* HEADER */}
                    <h3 className="text-xl font-bold text-red-700 uppercase mb-4">Chủ đề</h3>

                    {/* TAG LIST */}
                    <div className="flex flex-wrap gap-2">
                        {data.tags.map((tag, idx) => (
                            <a
                                key={idx}
                                href={tag.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition"
                            >
                                #{tag.title}
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== RELATED / Tin liên quan ===== */}
            {data.related && data.related.length > 0 && (
                <section className="mt-10 border-t pt-6">
                    {/* HEADER */}
                    <h3 className="text-xl font-bold text-red-700 uppercase mb-4">Tin liên quan</h3>

                    {/* LIST */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {data.related.map((item, idx) => (
                            <Link
                                key={`${item.link}-${idx}`}
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="group block p-3 border rounded hover:shadow-md transition overflow-hidden"
                            >
                                {/* HÌNH ẢNH NẾU CÓ */}
                                {item.thumb || item.image ? (
                                    <img
                                        src={item.thumb || item.image}
                                        alt={item.title}
                                        className="w-full h-36 object-cover rounded mb-2 group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : null}

                                {/* TIÊU ĐỀ */}
                                <h4 className="text-sm font-semibold text-red-700 group-hover:text-red-900 line-clamp-2">
                                    {item.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== COMMENTS ===== */}
            {data.comments && (
                <section className="mt-10 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Bình luận
                    </h3>

                    <textarea
                        rows={3}
                        placeholder={data.comments.placeholder}
                        className="w-full border rounded p-3 focus:outline-none focus:ring"
                    />

                    <div className="flex justify-end mt-3">
                        <button
                            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Gửi bình luận
                        </button>
                    </div>

                    {data.comments.hasMore && (
                        <p className="mt-3 text-sm text-gray-500 italic">
                            Bình luận sẽ được biên tập trước khi hiển thị
                        </p>
                    )}
                </section>
            )}

            {/* ===== SAME CATEGORY ===== */}
            {data.sameCategory && data.sameCategory.length > 0 && (
                <section className="mt-12 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Cùng chuyên mục
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.sameCategory.map((item, idx) => (
                            <Link
                                key={idx}
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="group block"
                            >
                                {item.thumb && (
                                    <img
                                        src={item.thumb}
                                        alt={item.title}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                )}

                                <h4 className="mt-2 text-sm font-medium group-hover:text-red-700 line-clamp-2">
                                    {item.title}
                                </h4>

                                {item.time && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.time}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== TIN TIÊU ĐIỂM ===== */}
            {focusNews.length > 0 && (
                <div className="hot-news">
                    <div className="box-heading">
                        <h3 className="wrap-heading">
                            <span className="heading">Tin tiêu điểm</span>
                        </h3>
                    </div>

                    <div className="box-content" data-source="content-box-focus">

                        {/* ===== BÀI CHÍNH ===== */}
                        {focusNews[0] && (
                            <article className="story primary">
                                {focusNews[0].image && (
                                    <figure className="story__thumb">
                                        <Link
                                            className="cms-link"
                                            to={`/detail?link=${encodeURIComponent(focusNews[0].link)}`}
                                            title={focusNews[0].title}
                                        >
                                            <img
                                                src={focusNews[0].image}
                                                alt={focusNews[0].title}
                                            />
                                        </Link>
                                    </figure>
                                )}

                                <h2 className="story__heading">
                                    <Link
                                        className="cms-link"
                                        to={`/detail?link=${encodeURIComponent(focusNews[0].link)}`}
                                        title={focusNews[0].title}
                                    >
                                        {focusNews[0].title}
                                    </Link>
                                </h2>

                                {focusNews[0].time && (
                                    <time className="story__time">
                                        {focusNews[0].time}
                                    </time>
                                )}

                                {focusNews[0].summary && (
                                    <div className="story__summary story__shorten">
                                        <p>{focusNews[0].summary}</p>
                                    </div>
                                )}
                            </article>
                        )}

                        {/* ===== DANH SÁCH BÊN PHẢI ===== */}
                        <div className="feature">
                            {focusNews.slice(1).map((item, idx) => (
                                <article className="story" key={idx}>
                                    {item.image && (
                                        <figure className="story__thumb">
                                            <Link
                                                className="cms-link"
                                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                title={item.title}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                            </Link>
                                        </figure>
                                    )}

                                    <h2 className="story__heading">
                                        <Link
                                            className="cms-link"
                                            to={`/detail?link=${encodeURIComponent(item.link)}`}
                                            title={item.title}
                                        >
                                            {item.title}
                                        </Link>
                                    </h2>

                                    {item.time && (
                                        <time className="story__time">
                                            {item.time}
                                        </time>
                                    )}

                                    {item.summary && (
                                        <div className="story__summary story__shorten">
                                            <p>{item.summary}</p>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== TIN NỔI BẬT (CLONE WEB THẬT) ===== */}
            {highlightNews.length > 0 && (
                <section className="special-news swiper mt-10">
                    {/* ===== HEADING ===== */}
                    <div className="box-heading mb-4 flex items-center justify-between">
                        <h3 className="wrap-heading">
                <span className="heading text-xl font-bold text-red-700">
                    Tin nổi bật
                </span>
                        </h3>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1.2 },
                            640: { slidesPerView: 2.2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="box-content"
                    >
                        {highlightNews.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <article className="story h-full group bg-white rounded shadow-sm hover:shadow-md transition">

                                    {/* ===== THUMB ===== */}
                                    <figure className="story__thumb overflow-hidden rounded-t">
                                        <Link
                                            className="cms-link block"
                                            to={`/detail?link=${encodeURIComponent(item.link)}`}
                                            title={item.title}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-44 bg-gray-200" />
                                            )}
                                        </Link>
                                    </figure>

                                    {/* ===== CONTENT ===== */}
                                    <div className="p-4 flex flex-col gap-2">

                                        {/* CATEGORY */}
                                        {item.category && (
                                            <Link
                                                to={`/category/${getSlugFromUrl(item.category.link)}`}
                                                className="story__cate text-xs font-semibold uppercase text-red-600 hover:underline"
                                            >
                                                {item.category.title}
                                            </Link>
                                        )}

                                        {/* TITLE */}
                                        <h3 className="story__heading text-sm font-semibold leading-snug line-clamp-3">
                                            <Link
                                                className="cms-link hover:text-red-700 transition"
                                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                title={item.title}
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>

                                        {/* TIME */}
                                        {item.time && (
                                            <time className="story__time text-xs text-gray-500 mt-auto">
                                                {item.time}
                                            </time>
                                        )}
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {/* ===== ĐỪNG BỎ LỠ ===== */}
            {latestNews.length > 0 && (
                <section className="many-pack mt-10">
                    {/* HEADING */}
                    <div className="box-heading mb-4">
                        <h3 className="wrap-heading">
        <span className="heading text-2xl font-bold border-l-4 border-red-600 pl-3">
          Đừng bỏ lỡ
        </span>
                        </h3>
                    </div>

                    {/* LIST */}
                    <div className="box-content content-list grid gap-6">
                        {latestNews.map((item, idx) => (
                            <article
                                key={idx}
                                className="story flex gap-4 pb-6 border-b last:border-b-0 items-start"
                            >
                                {/* ===== THUMB (40%) ===== */}
                                <figure className="story__thumb flex-shrink-0 w-2/5 overflow-hidden rounded-lg">
                                    <Link
                                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                                        title={item.title}
                                        className="block w-full h-full"
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 rounded-lg" />
                                        )}
                                    </Link>
                                </figure>

                                {/* ===== CONTENT (60%) ===== */}
                                <div className="story__content flex flex-col gap-3 w-3/5">
                                    {/* TITLE */}
                                    <h3 className="story__heading text-lg font-semibold leading-snug line-clamp-2">
                                        <Link
                                            to={`/detail?link=${encodeURIComponent(item.link)}`}
                                            className="hover:text-red-700 transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    </h3>

                                    {/* TIME */}
                                    {item.time && (
                                        <time className="story__time text-sm text-gray-500">
                                            {item.time}
                                        </time>
                                    )}

                                    {/* SUMMARY */}
                                    {item.summary && (
                                        <div className="story__summary text-sm text-gray-600 line-clamp-3">
                                            <p>{item.summary}</p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}



        </article>
    );
}
