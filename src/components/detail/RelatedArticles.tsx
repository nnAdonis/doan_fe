import { Link } from "react-router-dom";

export default function RelatedArticles({ items }: { items: any[] }) {
    if (!items?.length) return null;

    return (
        <section className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold text-red-700 mb-4">
                Tin liên quan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map(item => (
                    <Link
                        key={item.link}
                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                        className="block p-3 border rounded hover:shadow"
                    >
                        {item.thumb && (
                            <img
                                src={item.thumb}
                                className="w-full h-36 object-cover rounded mb-2"
                            />
                        )}
                        <h4 className="text-sm font-semibold line-clamp-2">
                            {item.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </section>
    );
}
