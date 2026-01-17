import {Link} from "react-router-dom";

export default function FocusNews({items}: { items: any[] }) {
    if (!items?.length) return null;

    return (
        <section className="mt-10">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
                Tin tiêu điểm
            </h3>

            <div className="grid grid-cols-12 gap-6">
                {items[0] && (
                    <article className="col-span-12 md:col-span-7">
                        <img src={items[0].image} className="w-full h-72 object-cover rounded"/>
                        <h2 className="text-2xl font-bold mt-3">
                            <Link to={`/detail?link=${encodeURIComponent(items[0].link)}`}>
                                {items[0].title}
                            </Link>
                        </h2>
                    </article>
                )}

                <div className="col-span-12 md:col-span-5 space-y-4">
                    {items.slice(1).map(item => (
                        <Link key={item.link} to={`/detail?link=${encodeURIComponent(item.link)}`}
                              className="flex gap-3">
                            {item.image && (
                                <img src={item.image} className="w-28 h-20 object-cover rounded"/>
                            )}
                            <h3 className="text-sm font-semibold line-clamp-2">
                                {item.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
