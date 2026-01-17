import { Link } from "react-router-dom";

export default function SameCategory({ items }: { items: any[] }) {
    if (!items?.length) return null;

    return (
        <section className="mt-12 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">
                Cùng chuyên mục
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(item => (
                    <Link key={item.link} to={`/detail?link=${encodeURIComponent(item.link)}`} className="block">
                        {item.thumb && (
                            <img src={item.thumb} className="w-full h-32 object-cover rounded"/>
                        )}
                        <h4 className="mt-2 text-sm font-medium line-clamp-2">
                            {item.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </section>
    );
}
