import { useEffect, useState } from "react";

type BannerProps = {
    images: string[];
    interval?: number;
    className?: string;
};

export default function Banner({images, interval = 5000, className = "",}: BannerProps) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images.length) return null;

    return (
        <div className={`mt-4 ${className}`}>
            <img
                src={images[index]}
                alt="banner"
                className="w-full object-cover"
            />
        </div>
    );
}
