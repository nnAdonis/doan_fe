import { Link } from "react-router-dom";

interface SectionHeadingProps {
    title: string;
    link?: string;
    className?: string;
}

export function SectionHeading({ title, link, className = "" }: SectionHeadingProps) {
    const content = link ? (
        <Link className="heading" to={link}>
            {title}
        </Link>
    ) : (
        <span>{title}</span>
    );

    return (
        <div className={`box-heading mb-3 ${className}`}>
            <h3 className="wrap-heading text-lg text-[#c31e40] font-bold flex gap-2">
                {content}
                <div className="flex-1 border-b border-[#c31e40] relative bottom-[8px]"></div>
            </h3>
        </div>
    );
}
