import { Link } from "react-router-dom";

interface NewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface FeaturedNewsCardProps {
    article: NewsItem;
    layout?: "horizontal" | "vertical";
}

export function FeaturedNewsCard({ article, layout = "horizontal" }: FeaturedNewsCardProps) {
    const isHorizontal = layout === "horizontal";

    return (
        <article className={`story ${isHorizontal ? "grid grid-cols-[1fr_260px] gap-[20px]" : "flex flex-col gap-[20px]"}`}>
            <figure className="story__thumb overflow-hidden">
                <Link to={`/detail?link=${encodeURIComponent(article.link)}`}>
                    {article.image ? (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-200" />
                    )}
                </Link>
            </figure>
            <div>
                <h2 className="story__heading text-2xl font-bold leading-snug line-clamp-3">
                    <Link
                        to={`/detail?link=${encodeURIComponent(article.link)}`}
                        className="hover:text-red-700 transition-colors"
                    >
                        {article.title}
                    </Link>
                </h2>
                {article.time && (
                    <time className="story__time text-sm text-gray-500 mt-1 block">{article.time}</time>
                )}
                {article.summary && (
                    <div className="story__summary text-gray-600 mt-2 line-clamp-4">
                        <p>{article.summary}</p>
                    </div>
                )}
            </div>
        </article>
    );
}
