import { Link } from "react-router-dom";

export default function ForYouSlider({ items }: { items: any[] }) {
    if (!items?.length) return null;

    return (
        <section className="mt-12 border-t pt-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-700 uppercase">
                    Dành cho bạn
                </h3>
                <span className="text-xs text-gray-400">Sponsored</span>
            </div>

            <div className="overflow-x-auto flex gap-4 py-2">
                {items.map(item => (
                    <Link
                        key={item.link}
                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                        className="shrink-0 w-[300px] bg-white rounded shadow hover:shadow-md"
                    >
                        <div className="h-40 overflow-hidden">
                            <img
                                src={item.image || "https://via.placeholder.com/300x160"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-3">
                            <span className="text-xs text-gray-500">
                                giaoducthoidai.vn
                            </span>
                            <h4 className="text-sm font-semibold line-clamp-2">
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
