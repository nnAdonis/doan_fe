import {Link} from "react-router-dom";
import {getSlugFromUrl} from "../../utils/getSlugFromUrl";

export default function ArticleHeader({data}: { data: any }) {
    return (
        <>
            {/* HOT EVENTS */}
            {data.hotEvents?.length > 0 && (
                <div className="hot-events mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-red-700 uppercase whitespace-nowrap">
                            Chủ đề
                        </h3>
                        <div className="overflow-x-auto flex gap-6 py-1">
                            {data.hotEvents.map((e: any) => (
                                <Link key={e.link} to={`/chu-de?link=${encodeURIComponent(e.link)}`}
                                      className="text-blue-700 hover:underline font-semibold">
                                    #{e.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BREADCRUMB */}
            {data.breadcrumb?.parent && (
                <div className="mb-6 flex flex-wrap gap-4">
                    <Link to={`/category/${getSlugFromUrl(data.breadcrumb.parent.link)}`}
                          className="text-xl font-bold text-red-700">
                        {data.breadcrumb.parent.title}
                    </Link>

                    {data.breadcrumb.children?.map((child: any) => (
                        <Link key={child.link} to={`/category/${getSlugFromUrl(child.link)}`}
                              className="text-gray-700 font-semibold hover:text-red-700">
                            {child.title}
                        </Link>
                    ))}
                </div>
            )}

            <h1 className="text-3xl font-bold mb-3">{data.title}</h1>

            {(data.author || data.time) && (
                <div className="text-sm text-gray-500 mb-4">
                    {data.author} {data.author && data.time && "•"} {data.time}
                </div>
            )}

            {data.sapo && (
                <div
                    className="text-lg font-medium mb-6"
                    dangerouslySetInnerHTML={{__html: data.sapo}}
                />
            )}
        </>
    );
}
