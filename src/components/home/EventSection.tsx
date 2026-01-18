import { FeaturedNewsCard } from "./FeaturedNewsCard.tsx";
import { SmallNewsCard } from "./SmallNewsCard.tsx";
import { SectionHeading } from "./SectionHeading.tsx";
import TableNew from "../TableNew.tsx";
import RecommendationBox from "../RecommendationBox.tsx";

interface NewsItem {
    title: string;
    link: string;
    image?: string;
    summary?: string;
    time?: string;
}

interface EventSectionProps {
    topNews: NewsItem[];
}

export function EventSection({ topNews }: EventSectionProps) {
    const featured = topNews[0];
    const smallNews = topNews.slice(1, 6);

    return (
        <div className="grid grid-cols-[3fr_1fr] gap-6">
            <div>
                <SectionHeading title="Toàn Cảnh - Sự Kiện" />
                <div className="abf-homepage mb-8">
                    <div className="top-news grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 mb-6">
                        {featured && (
                            <div className="rank-1">
                                <FeaturedNewsCard article={featured} layout="vertical" />
                            </div>
                        )}

                        <div className="blog-list flex flex-col gap-4">
                            {smallNews.map((item, idx) => (
                                <SmallNewsCard key={idx} article={item} variant="horizontal" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TableNew/>
                <RecommendationBox/>
            </div>
        </div>
    );
}
