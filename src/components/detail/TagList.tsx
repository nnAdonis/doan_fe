export default function TagList({ tags }: { tags: any[] }) {
    if (!tags?.length) return null;

    return (
        <section className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold text-red-700 uppercase mb-4">
                Chủ đề
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <a
                        key={tag.link}
                        href={tag.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
                    >
                        #{tag.title}
                    </a>
                ))}
            </div>
        </section>
    );
}
