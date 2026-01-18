import { Link } from "react-router-dom";

interface NewsItem {
    title: string;
    link: string;
    image?: string;
}

interface SmallNewsCardProps {
    article: NewsItem;
    variant?: "grid" | "horizontal" | "list";
}

export function SmallNewsCard({ article, variant = "grid" }: SmallNewsCardProps) {
    const baseClasses = "story flex flex-col border border-transparent hover:border-red-500 rounded-lg transition-all duration-300";
    const horizontalClasses = "story gird border border-transparent hover:border-red-500 transition-all duration-300";

    return (
        <article className={variant === "horizontal" ? horizontalClasses : baseClasses}>
            <figure className={`story__thumb overflow-hidden ${variant === "grid" ? "rounded-t-lg" : ""}`}>
                <Link to={`/detail?link=${encodeURIComponent(article.link)}`} title={article.title}>
                    {article.image ? (
                        <img
                            src={article.image}
                            alt={article.title}
                            className={`w-full ${variant === "horizontal" ? "h-20" : "h-32"} object-cover hover:scale-105 transition-transform duration-300`}
                        />
                    ) : (
                        <div className={`w-full ${variant === "horizontal" ? "h-20" : "h-32"} bg-gray-200`} />
                    )}
                </Link>
            </figure>
            <h2 className={`story__heading ${variant === "horizontal" ? "text-[14px]" : "text-sm"} font-medium mt-1 line-clamp-2 px-2`}>
                <Link
                    to={`/detail?link=${encodeURIComponent(article.link)}`}
                    className="hover:text-red-700 transition-colors"
                >
                    {article.title}
                </Link>
            </h2>
        </article>
    );
}
