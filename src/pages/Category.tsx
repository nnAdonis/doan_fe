import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRss } from "../services/rssService";

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

export default function Category() {
    const { slug } = useParams();
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const category = slug ? CATEGORY_MAP[slug] : null;
    const parent = category?.parent
        ? CATEGORY_MAP[category.parent]
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

    return (
        <div className="max-w-5xl mx-auto px-4 mt-6">

            {/* ===== BREADCRUMB ===== */}
            <div className="mb-4 text-sm text-gray-600">
                {parent && (
                    <>
                        <Link
                            to={`/category/${category.parent}`}
                            className="hover:underline"
                        >
                            {parent.title}
                        </Link>
                        <span className="mx-2">›</span>
                    </>
                )}
                <span className="font-semibold">{category.title}</span>
            </div>

            {/* ===== TITLE ===== */}
            <h1 className="text-2xl font-bold mb-6 border-l-4 border-red-700 pl-3">
                {category.title}
            </h1>

            {loading && <p>Đang tải...</p>}

            {!loading && news.length === 0 && (
                <p>Không có bài viết</p>
            )}

            {/* ===== LIST BÀI VIẾT ===== */}
            <div className="grid gap-6">
                {news.map((item, idx) => (
                    <article
                        key={idx}
                        className="story grid grid-cols-[120px_1fr] gap-4 pb-4 border-b"
                    >
                        {/* IMAGE */}
                        <figure className="story__thumb overflow-hidden rounded">
                            <Link
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                title={item.title}
                                className="block"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-20 object-cover hover:scale-105 transition"
                                    />
                                ) : (
                                    <div className="w-full h-20 bg-gray-200" />
                                )}
                            </Link>
                        </figure>

                        {/* CONTENT */}
                        <div className="story__content flex flex-col gap-1">
                            <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                                <Link
                                    to={`/detail?link=${encodeURIComponent(item.link)}`}
                                    className="hover:text-red-700 transition"
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
                                <p className="text-xs text-gray-600 line-clamp-2">
                                    {item.summary}
                                </p>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
