import { Link } from "react-router-dom";

interface LatestNewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

export default function LatestNews({ items }: { items: LatestNewsItem[] }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="many-pack mt-10">
            {/* ===== HEADING ===== */}
            <div className="box-heading mb-4">
                <h3 className="wrap-heading">
                    <span className="heading text-2xl font-bold border-l-4 border-red-600 pl-3">
                        Đừng bỏ lỡ
                    </span>
                </h3>
            </div>

            {/* ===== LIST ===== */}
            <div className="grid gap-6">
                {items.map(item => (
                    <article
                        key={item.link}
                        className="flex gap-4 pb-6 border-b last:border-b-0 items-start"
                    >
                        {/* THUMB */}
                        <figure className="shrink-0 w-2/5 overflow-hidden rounded-lg">
                            <Link
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="block"
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

                        {/* CONTENT */}
                        <div className="flex flex-col gap-3 w-3/5">
                            <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                                <Link
                                    to={`/detail?link=${encodeURIComponent(item.link)}`}
                                    className="hover:text-red-700 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            </h3>

                            {item.time && (
                                <time className="text-sm text-gray-500">
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
        </section>
    );
}
