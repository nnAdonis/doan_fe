import { useNavigate } from "react-router-dom";

interface ChildCategory {
    key: string;
    title: string;
}

interface CategoryHeaderProps {
    title: string;
    childCategories: ChildCategory[];
}

export function CategoryHeader({ title, childCategories }: CategoryHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className='flex space-x-3'>
            <h1 className="text-2xl font-bold mb-6 border-l-4 border-red-700 pl-3">
                {title}
            </h1>

            {childCategories.length > 0 && (
                <ul className="flex gap-3 relative top-1.5">
                    {childCategories.map((item) => (
                        <li 
                            key={item.key} 
                            onClick={() => navigate(`/category/${item.key}`)} 
                            className="cursor-pointer hover:text-red-600"
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
