import { Link } from "react-router-dom";
import type { NewsItem } from "./SidebarMiddle";

interface Props {
    title: string;
    data: NewsItem[];
}

export default function SidebarBoxLarge({ title, data }: Props) {
    return (
        <div className="bg-transparent rounded">

            {/* ===== HEADER ===== */}
            <div className="px-4 py-3">
                <h3 className="text-2xl font-bold text-red-700">
                    {title}
                </h3>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="px-4 space-y-6">
                {data.map((item, idx) => (
                    <article key={idx} className="space-y-3">

                        {/* IMAGE – NHỎ HƠN & KHÔNG BỊ CẮT */}
                        <figure className="w-full h-36 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                        </figure>

                        {/* TITLE */}
                        <h4 className="text-base font-semibold leading-snug">
                            <Link
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="hover:text-red-700 transition"
                            >
                                {item.title}
                            </Link>
                        </h4>

                    </article>
                ))}
            </div>

        </div>
    );
}
