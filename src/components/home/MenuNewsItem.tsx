import { Link } from "react-router-dom";
import { SectionHeading } from "./SectionHeading.tsx";

interface NewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface MenuNewsItemProps {
    title: string;
    rssLink: string;
    articles: NewsItem[];
}

export function MenuNewsItem({ title, rssLink, articles }: MenuNewsItemProps) {
    const top = articles[0];
    const subs = articles.slice(1, 5);

    return (
        <div className="onemain-foursub">
            <SectionHeading 
                title={title} 
                link={`/chu-de?link=${encodeURIComponent(rssLink)}`}
                className="mt-4"
            />

            <div className="box-content grid grid-cols-1 md:grid-cols-[3fr_3fr] gap-8">
                {top && (
                    <div className="item-primary">
                        <article className="story flex flex-col">
                            <figure className="story__thumb overflow-hidden rounded-lg">
                                <Link to={`/detail?link=${encodeURIComponent(top.link)}`}>
                                    {top.image ? (
                                        <img
                                            src={top.image}
                                            alt={top.title}
                                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200" />
                                    )}
                                </Link>
                            </figure>
                            <h3 className="story__heading mt-2 text-base font-semibold line-clamp-2">
                                <Link
                                    to={`/detail?link=${encodeURIComponent(top.link)}`}
                                    className="hover:text-red-700 transition-colors"
                                >
                                    {top.title}
                                </Link>
                            </h3>
                            {top.time && (
                                <time className="story__time text-sm text-gray-500 mt-1 block">{top.time}</time>
                            )}
                            {top.summary && (
                                <div className="story__summary text-gray-600 mt-1 line-clamp-3">
                                    <p>{top.summary}</p>
                                </div>
                            )}
                        </article>
                    </div>
                )}

                <div className="item-secondary grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subs.map((sub, idx) => (
                        <article
                            key={idx}
                            className="story flex flex-col border border-transparent hover:border-red-500 rounded-lg transition-all duration-300"
                        >
                            <figure className="story__thumb overflow-hidden rounded-t-lg">
                                <Link to={`/detail?link=${encodeURIComponent(sub.link)}`}>
                                    {sub.image ? (
                                        <img
                                            src={sub.image}
                                            alt={sub.title}
                                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-200" />
                                    )}
                                </Link>
                            </figure>
                            <h3 className="story__heading text-sm font-medium mt-1 line-clamp-2 px-2">
                                <Link
                                    to={`/detail?link=${encodeURIComponent(sub.link)}`}
                                    className="hover:text-red-700 transition-colors"
                                >
                                    {sub.title}
                                </Link>
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
