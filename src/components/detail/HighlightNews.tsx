import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getSlugFromUrl } from "../../utils/getSlugFromUrl";

interface HighlightNewsItem {
    title: string;
    link: string;
    image?: string;
    time?: string;
    category?: {
        title: string;
        link: string;
    };
}

export default function HighlightNews({ items }: { items: HighlightNewsItem[] }) {
    if (!items || items.length === 0) return null;

    return (
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
                {items.map(item => (
                    <SwiperSlide key={item.link}>
                        <article className="story h-full group bg-white rounded shadow-sm hover:shadow-md transition">

                            {/* ===== THUMB ===== */}
                            <figure className="story__thumb overflow-hidden rounded-t">
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
                                        className="text-xs font-semibold uppercase text-red-600 hover:underline"
                                    >
                                        {item.category.title}
                                    </Link>
                                )}

                                {/* TITLE */}
                                <h3 className="text-sm font-semibold leading-snug line-clamp-3">
                                    <Link
                                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                                        className="hover:text-red-700 transition"
                                    >
                                        {item.title}
                                    </Link>
                                </h3>

                                {/* TIME */}
                                {item.time && (
                                    <time className="text-xs text-gray-500 mt-auto">
                                        {item.time}
                                    </time>
                                )}
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
