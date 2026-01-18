import { FeaturedNewsCard } from "./FeaturedNewsCard.tsx";
import { SmallNewsCard } from "./SmallNewsCard.tsx";

interface NewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface TopNewsSectionProps {
    topNews: NewsItem[];
}

export function TopNewsSection({ topNews }: TopNewsSectionProps) {
    const featured = topNews[0];
    const smallNews = topNews.slice(1, 6);

    return (
        <div className="abf-homepage mb-8">
            <div className="top-news grid grid-cols-1 md:grid-cols-[4.5fr_1fr] gap-6 mb-6">
                {featured && (
                    <div className="rank-1">
                        <FeaturedNewsCard article={featured} layout="horizontal" />
                    </div>
                )}

                {/* Banner quảng cáo */}
                <div className="rank-2 hidden md:flex flex-col gap-4">
                    <div className="banner bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                        <a href="/epaper/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://cdn.giaoducthoidai.vn/images/df6357f0e2dcb343ab463ca30a52a8b2fe20a926d2110a752ee56e08d9a7d2edd84ba235097c0affb7644db7301c1301/banner-baoin.png"
                                alt="Web: Đọc báo giấy"
                                className="w-full h-full object-cover"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* 4 bài nhỏ */}
            <div className="blog-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {smallNews.map((item, idx) => (
                    <SmallNewsCard key={idx} article={item} variant="grid" />
                ))}
            </div>
        </div>
    );
}
