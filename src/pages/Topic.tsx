import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

type Article = {
    title: string;
    link: string;
    thumb?: string;
    time?: string;
};

type TopicData = {
    title: string;
    articles: Article[];
};

export default function Topic() {
    const [params] = useSearchParams();
    const link = params.get("link");

    const [data, setData] = useState<TopicData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!link) return;

        setLoading(true);

        fetch(`http://localhost:3000/api/topic?link=${encodeURIComponent(link)}`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
            .catch(err => {
                console.error(err);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [link]);

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Đang tải chủ đề...
            </div>
        );
    }

    if (!data || !Array.isArray(data.articles)) {
        return (
            <div className="text-center py-10 text-red-600">
                Không có dữ liệu chủ đề
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">{data.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.articles.map((item, idx) => (
                    <Link
                        key={idx}
                        to={`/detail?link=${encodeURIComponent(item.link)}`}
                        className="flex gap-3 p-3 border rounded hover:bg-gray-50"
                    >
                        {item.thumb && (
                            <img
                                src={item.thumb}
                                alt={item.title}
                                className="w-32 h-20 object-cover rounded"
                            />
                        )}

                        <div>
                            <h3 className="font-semibold line-clamp-2">
                                {item.title}
                            </h3>
                            {item.time && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {item.time}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
