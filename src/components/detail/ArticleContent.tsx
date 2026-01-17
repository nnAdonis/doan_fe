export default function ArticleContent({ html }: { html: string }) {
    return (
        <div
            className="article-content max-w-[760px]"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
