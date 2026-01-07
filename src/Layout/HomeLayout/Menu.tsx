import { Link } from "react-router-dom";
import { menuData } from "../../data/menu";
import { FaHome } from "react-icons/fa";

export default function Menu() {
    return (
        <nav className="bg-[#c31e40] text-white text-[14px]">
            <div className="container mx-auto">
                <ul className="flex items-center h-10">

                    {/* HOME */}
                    <li className="h-10 flex items-center">
                        <Link
                            to="/"
                            className="px-3 flex items-center hover:bg-[#a91833]"
                        >
                            <FaHome />
                        </Link>
                    </li>

                    {menuData.map((item, idx) => (
                        <li
                            key={idx}
                            className="relative h-10 flex items-center group"
                        >
                            {/* MENU CHA */}
                            <Link
                                to={`/category/${item.slug}`}
                                className="
                                    px-3 h-10 flex items-center
                                    font-medium
                                    hover:bg-[#a91833]
                                    whitespace-nowrap
                                "
                            >
                                {item.title}
                            </Link>

                            {/* MENU CON */}
                            {item.children && (
                                <ul
                                    className="
                                        absolute left-0 top-full
                                        bg-white text-black
                                        min-w-[220px]
                                        shadow-lg
                                        hidden group-hover:block
                                        z-50
                                    "
                                >
                                    {item.children.map((sub, subIdx) => (
                                        <li key={subIdx}>
                                            <Link
                                                to={`/category/${sub.slug}`}
                                                className="
                                                    block px-4 py-2
                                                    text-[14px] font-normal
                                                    whitespace-nowrap
                                                    hover:bg-gray-100
                                                    hover:text-[#c31e40]
                                                "
                                            >
                                                {sub.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
