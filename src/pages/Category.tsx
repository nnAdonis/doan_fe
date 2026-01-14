import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRss } from "../services/rssService";
import SidebarMiddle from "./SidebarMiddle";

/* ================= MAP DANH MỤC ================= */
const CATEGORY_MAP: Record<
    string,
    { rss: string; title: string; parent?: string }
> = {
    // ===== CHA =====
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

    // ===== CON GIÁO DỤC =====
    "chinh-sach": {
        rss: "https://giaoducthoidai.vn/rss/chinh-sach.rss",
        title: "Chính sách",
        parent: "giao-duc",
    },
    "dia-phuong": {
        rss: "https://giaoducthoidai.vn/rss/dia-phuong.rss",
        title: "Địa phương",
        parent: "giao-duc",
    },
    "tuyen-sinh-du-hoc": {
        rss: "https://giaoducthoidai.vn/rss/tuyen-sinh-du-hoc.rss",
        title: "Đào tạo tuyển sinh",
        parent: "giao-duc",
    },
    "giao-duc-bon-phuong": {
        rss: "https://giaoducthoidai.vn/rss/giao-duc-bon-phuong.rss",
        title: "Giáo dục bốn phương",
        parent: "giao-duc",
    },
    "chuyen-dong": {
        rss: "https://giaoducthoidai.vn/rss/chuyen-dong.rss",
        title: "Chuyển động",
        parent: "giao-duc",
    },

    // ===== CON THỜI SỰ =====
    "giao-duc-do-thi": {
        rss: "https://giaoducthoidai.vn/rss/giao-duc-do-thi.rss",
        title: "Giáo dục đô thị",
        parent: "thoi-su",
    },
    "thoi-su-xa-hoi": {
        rss: "https://giaoducthoidai.vn/rss/thoi-su-xa-hoi.rss",
        title: "Thời sự xã hội",
        parent: "thoi-su",
    },
    "chinh-tri": {
        rss: "https://giaoducthoidai.vn/rss/chinh-tri.rss",
        title: "Chính trị",
        parent: "thoi-su",
    },
    "kinh-te": {
        rss: "https://giaoducthoidai.vn/rss/kinh-te.rss",
        title: "Kinh tế",
        parent: "thoi-su",
    },

    "an-ninh": {
        rss: "https://giaoducthoidai.vn/rss/an-ninh.rss",
        title: "An ninh",
        parent: "phap-luat-phap-luat",
    },
    "phap-dinh": {
        rss: "https://giaoducthoidai.vn/rss/phap-dinh.rss",
        title: "Pháp đình",
        parent: "phap-luat-phap-luat",
    },
    "goc-nhin": {
        rss: "https://giaoducthoidai.vn/rss/goc-nhin.rss",
        title: "Bạn đọc - Điều tra",
        parent: "phap-luat-phap-luat",
    },

    "cong-doan": {
        rss: "https://giaoducthoidai.vn/rss/cong-doan.rss",
        title: "An ninh",
        parent: "ket-noi",
    },
    "dong-hanh": {
        rss: "https://giaoducthoidai.vn/rss/dong-hanh.rss",
        title: "Đồng hành",
        parent: "ket-noi",
    },
    "khoa-hoc": {
        rss: "https://giaoducthoidai.vn/rss/khoa-hoc.rss",
        title: "Khoa học - Công nghê",
        parent: "ket-noi",
    },

    "phuong-phap": {
        rss: "https://giaoducthoidai.vn/rss/phuong-phap.rss",
        title: "Phương pháp",
        parent: "trao-doi",
    },
    "goc-chuyen-gia": {
        rss: "https://giaoducthoidai.vn/rss/goc-chuyen-gia.rss",
        title: "Góc chuyên gia",
        parent: "trao-doi",
    },

    "ky-nang-song": {
        rss: "https://giaoducthoidai.vn/rss/ky-nang-song.rss",
        title: "Kỹ năng",
        parent: "hoc-duong",
    },
    "du-hoc": {
        rss: "https://giaoducthoidai.vn/rss/du-hoc.rss",
        title: "Du học",
        parent: "hoc-duong",
    },
    "guong-mat": {
        rss: "https://giaoducthoidai.vn/rss/guong-mat.rss",
        title: "Gương mặt",
        parent: "hoc-duong",
    },
    "the-chat": {
        rss: "https://giaoducthoidai.vn/rss/the-chat.rss",
        title: "Thể chất",
        parent: "hoc-duong",
    },

    "khoe-dep": {
        rss: "https://giaoducthoidai.vn/rss/khoe-dep.rss",
        title: "Khỏe đẹp",
        parent: "suc-khoe",
    },
    "gia-dinh": {
        rss: "https://giaoducthoidai.vn/rss/gia-dinh.rss",
        title: "Gia đình",
        parent: "suc-khoe",
    },
    "day-lui-covid": {
        rss: "https://giaoducthoidai.vn/rss/day-lui-covid.rss",
        title: "Đẩy lùi covid",
        parent: "suc-khoe",
    },

    "infographic-media": {
        rss: "https://giaoducthoidai.vn/rss/infographic-media.rss",
        title: "Infographic",
        parent: "video-media",
    },
    "video": {
        rss: "https://giaoducthoidai.vn/rss/video.rss",
        title: "Video",
        parent: "video-media",
    },
    "247-nong": {
        rss: "https://giaoducthoidai.vn/rss/247-nong.rss",
        title: "Nóng 247",
        parent: "video-media",
    },
    "tieu-diem": {
        rss: "https://giaoducthoidai.vn/rss/tieu-diem.rss",
        title: "Tiêu điểm",
        parent: "video-media",
    },

    "doi-song-van-hoa": {
        rss: "https://giaoducthoidai.vn/rss/doi-song-van-hoa.rss",
        title: "Đời sống văn hóa",
        parent: "van-hoa",
    },
    "the-gioi-sao": {
        rss: "https://giaoducthoidai.vn/rss/the-gioi-sao.rss",
        title: "Thế giới sao ",
        parent: "van-hoa",
    },
    "sang-tac": {
        rss: "https://giaoducthoidai.vn/rss/sang-tac.rss",
        title: "Sáng tác",
        parent: "van-hoa",
    },

    "the-thao-hoc-duong": {
        rss: "https://giaoducthoidai.vn/rss/the-thao-hoc-duong.rss",
        title: "Thể thao học đường",
        parent: "the-thao",
    },


};

/* ================= TYPES ================= */
// interface HotEvent {
//     title: string;
//     link: string;
// }

export default function Category() {
    const { slug } = useParams();
    const [news, setNews] = useState<any[]>([]);
    const [events, setEvents] = useState<{ title: string; link: string }[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loading, setLoading] = useState(true);

    const category = slug ? CATEGORY_MAP[slug] : undefined;

    if (!category) {
        return <p className="text-center py-10">Danh mục không tồn tại</p>;
    }

    const parent = category.parent
        ? CATEGORY_MAP[category.parent]
        : category;

    const parentSlug = category.parent ?? slug!;

    const childrenCategories = Object.entries(CATEGORY_MAP)
        .filter(([, value]) => value.parent === parentSlug)
        .map(([slug, value]) => ({
            title: value.title,
            link: `/category/${slug}`,
        }));

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
    const listNews = news.slice(1);

    /* ===== LOAD HOT EVENT ===== */
    useEffect(() => {
        fetch("http://localhost:3000/api/events")
            .then(res => res.json())
            .then(setEvents)
            .finally(() => setLoadingEvents(false));
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 mt-6">

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

            {/* ================= BREADCRUMB ================= */}
            {parent && (
                <div className="cate-breadcrumb mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">

                    {/* ===== CATEGORY PARENT ===== */}
                    <Link
                        to={`/category/${parentSlug}`}
                        className="text-xl font-bold text-red-700 hover:underline whitespace-nowrap"
                    >
                        {parent.title}
                    </Link>

                    {/* ===== CATEGORY CHILDREN ===== */}
                    {childrenCategories.length > 0 && (
                        <ul className="flex flex-wrap items-center gap-x-4">
                            {childrenCategories.map((child, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={child.link}
                                        className={`text-base font-semibold whitespace-nowrap transition
                                ${
                                            child.title === category.title
                                                ? "text-red-700"
                                                : "text-gray-700 hover:text-red-700"
                                        }`}
                                    >
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ================== GRID 3 CỘT ================== */}
            <div className="grid grid-cols-[55%_20%_25%] gap-6">

                {/* ===== MAIN CONTENT ===== */}
                <div>
                    <h1 className="text-2xl font-bold mb-6 border-l-4 border-red-700 pl-3">
                        {category.title}
                    </h1>

                    {loading && <p>Đang tải...</p>}

                    {!loading && featured && (
                        <>
                            {/* FEATURED */}
                            <article className="mb-8">
                                <figure className="overflow-hidden rounded">
                                    <Link to={`/detail?link=${encodeURIComponent(featured.link)}`}>
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            className="w-full h-80 object-cover hover:scale-105 transition"
                                        />
                                    </Link>
                                </figure>

                                <h2 className="text-xl font-bold mt-4 leading-snug">
                                    <Link
                                        to={`/detail?link=${encodeURIComponent(featured.link)}`}
                                        className="hover:text-red-700"
                                    >
                                        {featured.title}
                                    </Link>
                                </h2>

                                {/* 👉 MÔ TẢ */}
                                {featured.summary && (
                                    <p className="text-gray-600 mt-2 leading-relaxed">
                                        {featured.summary}
                                    </p>
                                )}
                            </article>

                            {/* LIST */}
                            <div className="grid gap-6">
                                {listNews.map((item, idx) => (
                                    <article
                                        key={idx}
                                        className="grid grid-cols-[2fr_3fr] gap-4 pb-6 border-b"
                                    >
                                        <figure className="overflow-hidden rounded">
                                            <Link to={`/detail?link=${encodeURIComponent(item.link)}`}>
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-28 object-cover hover:scale-105 transition"
                                                    />
                                                ) : (
                                                    <div className="w-full h-28 bg-gray-200" />
                                                )}
                                            </Link>
                                        </figure>

                                        <div>
                                            <h3 className="font-semibold text-base leading-snug">
                                                <Link
                                                    to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                    className="hover:text-red-700"
                                                >
                                                    {item.title}
                                                </Link>
                                            </h3>

                                            {item.time && (
                                                <time className="text-xs text-gray-500">
                                                    {item.time}
                                                </time>
                                            )}

                                            {item.summary && (
                                                <p className="text-sm text-gray-600 line-clamp-3">
                                                    {item.summary}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* ===== SIDEBAR ===== */}
                <SidebarMiddle />

                {/* ===== BANNER DỌC ===== */}
                <div className="sticky top-20 space-y-4">

                    {/* Banner 1 */}
                    <a
                        href="#"
                        className="block overflow-hidden rounded shadow"
                        title="Quảng cáo"
                    >
                        <img
                            src="https://via.placeholder.com/160x600?text=Banner+Ads"
                            alt="Banner quảng cáo"
                            className="w-full object-cover"
                        />
                    </a>

                    {/* Banner 2 */}
                    <a
                        href="#"
                        className="block overflow-hidden rounded shadow"
                        title="Quảng cáo"
                    >
                        <img
                            src="https://via.placeholder.com/160x300?text=Ads"
                            alt="Banner quảng cáo"
                            className="w-full object-cover"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

