import { Link } from "react-router-dom";

interface ArticleCardProps {
    article: {
        link: string;
        title: string;
        image?: string;
        time?: string;
        summary?: string;
    };
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="grid grid-cols-[240px_1fr] gap-2">
            <Link to={`/detail?link=${encodeURIComponent(article.link)}`} className="block">
                {article.image ? (
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full object-cover rounded hover:scale-105 transition"
                    />
                ) : (
                    <div className="w-full h-20 bg-gray-200"/>
                )}
            </Link>

            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-sm line-clamp-2">
                    <Link 
                        to={`/detail?link=${encodeURIComponent(article.link)}`} 
                        className="hover:text-red-700"
                    >
                        {article.title}
                    </Link>
                </h3>

                {article.time && (
                    <time className="text-xs text-gray-500">
                        {article.time}
                    </time>
                )}

                {article.summary && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                        {article.summary}
                    </p>
                )}
            </div>
        </article>
    );
}
