import { Link } from "react-router-dom";

interface FeaturedArticleProps {
    article: {
        link: string;
        title: string;
        image?: string;
    };
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
    return (
        <article className="mb-6">
            <Link to={`/detail?link=${encodeURIComponent(article.link)}`} className="block">
                {article.image && (
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-[360px] object-cover rounded"
                    />
                )}

                <h2 className="mt-4 text-xl font-bold leading-snug hover:text-red-700 transition">
                    {article.title}
                </h2>
            </Link>
        </article>
    );
}
