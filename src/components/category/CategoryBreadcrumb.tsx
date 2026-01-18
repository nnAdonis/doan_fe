import { Link } from "react-router-dom";

interface CategoryBreadcrumbProps {
    parentTitle?: string;
    parentSlug?: string;
    currentTitle: string;
}

export function CategoryBreadcrumb({ parentTitle, parentSlug, currentTitle }: CategoryBreadcrumbProps) {
    return (
        <div className="mb-4 text-sm text-gray-600">
            {parentTitle && parentSlug && (
                <>
                    <Link to={`/category/${parentSlug}`} className="hover:underline text-[20px] font-bold">
                        {parentTitle}
                    </Link>
                    <span className="mx-2">›</span>
                </>
            )}
            <span className="font-semibold">{currentTitle}</span>
        </div>
    );
}
