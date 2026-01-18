import { Link } from "react-router-dom";

interface Article {
    link: string;
    title: string;
    image?: string;
}

interface HighlightNewsSidebarProps {
    title: string;
    articles: Article[];
    sticky?: boolean;
}

export function HighlightNewsSidebar({ title, articles, sticky = false }: HighlightNewsSidebarProps) {
    return (
        <aside className={sticky ? "top-4 self-start sticky" : ""}>
            <h2 className="font-semibold text-lg border-l-4 border-red-700 pl-3 mb-2 bg-[#f5f5f5]">
                {title}
            </h2>

            <div className="flex flex-col gap-4">
                {articles.map((item, idx) => (
                    <article key={idx} className="flex flex-col gap-1">
                        {item.image && (
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="object-cover rounded"
                            />
                        )}
                        <h3 className="text-sm font-medium line-clamp-2">
                            <Link 
                                to={`/detail?link=${encodeURIComponent(item.link)}`} 
                                className="hover:text-red-700"
                            >
                                {item.title}
                            </Link>
                        </h3>
                    </article>
                ))}
            </div>
        </aside>
    );
}
