import { Link } from "react-router-dom";
import type { NewsItem } from "./SidebarMiddle";

interface Props {
    title: string;
    data: NewsItem[];
}

export default function SidebarBoxLarge({ title, data }: Props) {
    return (
        <div className="bg-white border rounded shadow-sm">
            <div className="border-b px-4 py-3">
                <h3 className="font-bold text-red-700 uppercase text-sm">
                    {title}
                </h3>
            </div>

            <div className="p-4 space-y-6">
                {data.map((item, idx) => (
                    <article key={idx} className="space-y-3">
                        <figure className="w-full h-48 overflow-hidden rounded">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                        </figure>

                        <h4 className="text-base font-semibold leading-snug">
                            <Link
                                to={`/detail?link=${encodeURIComponent(item.link)}`}
                                className="hover:text-red-700"
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
