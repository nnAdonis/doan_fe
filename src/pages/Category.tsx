import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRss } from "../services/rssService";
<<<<<<< HEAD
import {useNavigate} from "react-router";
import { menuData } from "../data/menu";
=======
import SidebarMiddle from "./SidebarMiddle";
import SeeMore from "../components/SeeMore.tsx";

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

>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359

/* ================= MENU / DANH MỤC ================= */
type MenuItem = {
    title: string;
    slug: string;
    children?: MenuItem[];
};

<<<<<<< HEAD
type Category = {
    rss: string;
    title: string;
    parent?: string;
};

function rssFromSlug(slug: string) {
    return `https://giaoducthoidai.vn/rss/${slug}.rss`;
}
=======
/* ================= TYPES ================= */
// interface HotEvent {
//     title: string;
//     link: string;
// }
>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359

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
<<<<<<< HEAD
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
=======
>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359

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
<<<<<<< HEAD
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
                            <Link
                                to={`/category/${category.parent}`}
                                className="hover:underline text-[20px] font-bold"
                            >
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
                                <li
                                    key={item.key}
                                    onClick={() => navigate(`/category/${item.key}`)}
                                    className="cursor-pointer hover:text-red-600"
                                >
                                    {item.title}
=======

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
>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359
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
                                <Link
                                    to={`/detail?link=${encodeURIComponent(featured.link)}`}
                                    className="block"
                                >
                                    {featured.image && (
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            className="w-full h-[360px] object-cover rounded"
                                        />
                                    )}

                                    <h2 className="mt-4 text-xl font-bold leading-snug hover:text-red-700 transition">
                                        {featured.title}
                                    </h2>
                                </Link>
                            </article>
                        )}
                        <div className="grid gap-6">
                            {news.slice(11,).map((item, idx) => (
                                <article
                                    key={idx}
                                    className="grid grid-cols-[240px_1fr] gap-2  "
                                >
                                    <Link
                                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                                        className="block"
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full object-cover rounded hover:scale-105 transition"
                                            />
                                        ) : (
                                            <div className="w-full h-20 bg-gray-200"/>
                                        )}
                                    </Link>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-semibold text-sm line-clamp-2">
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
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-cover rounded"
                                        />
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            <Link
                                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                className="hover:text-red-700"
                                            >
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
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-cover rounded"
                                        />
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            <Link
                                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                                className="hover:text-red-700"
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>

                        </aside>
                    </div>
                    {/* ================= CỘT PHẢI ================= */}
                    <div className={`w-full h-full`}>
                        <iframe
                            width="400"
                            height="800"
                            className=" border-0"
                            src ={`https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-7266710804606728&output=html&h=600&slotname=2392856285&adk=349447106&adf=3450753971&pi=t.ma~as.2392856285&w=300&fwrn=4&fwrnh=100&lmt=1768408620&rafmt=1&format=300x600&url=https%3A%2F%2Fgiaoducthoidai.vn%2Fgiao-duc-bon-phuong%2F&fwr=0&fwrattr=true&rpe=1&resp_fmts=4&aieuf=1&aicrs=1&uach=WyJXaW5kb3dzIiwiMTkuMC4wIiwieDg2IiwiIiwiMTQzLjAuMzY1MC44MCIsbnVsbCwwLG51bGwsIjY0IixbWyJNaWNyb3NvZnQgRWRnZSIsIjE0My4wLjM2NTAuODAiXSxbIkNocm9taXVtIiwiMTQzLjAuNzQ5OS4xMTAiXSxbIk5vdCBBKEJyYW5kIiwiMjQuMC4wLjAiXV0sMF0.&abgtt=6&dt=1768408620565&bpp=1&bdt=1073&idt=15&shv=r20260112&mjsv=m202601080101&ptt=9&saldr=aa&abxe=1&cookie=ID%3Dd94dd41efb8bf147%3AT%3D1768361558%3ART%3D1768408493%3AS%3DALNI_MbNIFo9OdwnsLkOc2LLAIC5I7qtdg&gpic=UID%3D000013284e97ef08%3AT%3D1768361558%3ART%3D1768408493%3AS%3DALNI_MZ_OnP8Iz_zTNrIWMNozSapcXKnNA&eo_id_str=ID%3Dba3bdfb0a9f08b23%3AT%3D1764417027%3ART%3D1768408493%3AS%3DAA-AfjZF5ctBp7bqOBKm6yZQwAEj&prev_fmts=0x0&nras=1&correlator=6781219692069&frm=20&pv=1&u_tz=420&u_his=9&u_h=1080&u_w=1920&u_ah=1080&u_aw=1920&u_cd=24&u_sd=1&dmc=8&adx=1210&ady=330&biw=1874&bih=1036&scr_x=0&scr_y=0&eid=42533293%2C95372614&oid=2&pvsid=315907412468031&tmod=288996712&uas=1&nvt=1&ref=https%3A%2F%2Fgiaoducthoidai.vn%2Fchinh-sach%2F&fc=1920&brdim=0%2C-1080%2C0%2C-1080%2C1920%2C-1080%2C1920%2C1080%2C1874%2C1036&vis=1&rsz=%7C%7CeoE%7C&abl=CS&pfx=0&fu=128&bc=31&bz=1.02&ifi=2&uci=a!2&fsb=1&dtd=19`}/>
                        <iframe
                            width="400"
                            height="800"
                            className=" top-4 self-start sticky border-0"
                            src={'https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2026-01-07/manhnguyentien/300x600_T1_02_B2/300x600_T1_02_B2/300x600_T1_02_B2.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fgiaoducthoidai.vn%252Fphap-luat-phap-luat%252F%26rid%3D0118hkglbi90000%26sspb%3D9900%26sspr%3D3500%26lsn%3D1768403328950%26ce%3D1%26lc%3D5%26cr%3D1768233123%26ui%3D2068233119569189116%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D99530%26items%3D452617%26zid%3D513615%26pr%3D45291183153%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1111%26dg%3D016965189fbb1c6987bcbbf3dd34ac90%26xtr%3DeyJhc2lkIjo3MTEwLCJwcm9maWxlaWQiOiIifQ%253D%253D%26sspz%3D2015934%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fwww.facebook.com%252Fshare%252F17Hyg1fEYU%252F%253Fmibextid%253DwwXIfr&temp=0&loc=5&weath=&autoplay=0&admid=adnzone_513615_0_452617&vast=https%3A%2F%2Fbrandingdatavast.cdnstoremedia.com%2Finfo%3Fu%3Dgiaoducthoidai.vn%252Fphap-luat-phap-luat%252F%26z%3D513615%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1768403328950%26dgid%3D016965189fbb1c6987bcbbf3dd34ac90%26l%3D5%26loc%3D5%26i%3D2068233119569189116%26isdetail%3D0%26pid%3D%26tags%3D5%26bannerid%3D452617%26encodebid%3D45291183153%26typead%3D%26id%3D0118hkglbi90000%26ua%3DMozilla%252F5.0%2520(Windows%2520NT%252010.0%253B%2520Win64%253B%2520x64)%2520AppleWebKit%252F537.36%2520(KHTML%252C%2520like%2520Gecko)%2520Chrome%252F143.0.0.0%2520Safari%252F537.36%2520Edg%252F143.0.0.0'}/>

                    </div>
                </div>
<<<<<<< HEAD
=======

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
>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359
            </div>
    );
}
<<<<<<< HEAD
=======

>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359
