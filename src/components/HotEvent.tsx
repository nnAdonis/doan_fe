import {FaBoltLightning} from "react-icons/fa6";
import {IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";
import {useEffect, useRef, useState} from "react";

const TAG_WIDTH = 132;
const VISIBLE_COUNT = 3;

const HotEvent = () => {
    const tags = [
        "#Mẹo vặt cuộc sống",
        "#Công nghệ",
        "#Lập trình",
        "#Frontend",
        "#ReactJS",
        "#JavaScript",
    ];

    const trackRef = useRef(null);
    const intervalRef = useRef<number | null>(null);

    const extendedTags = [...tags, ...tags]; // clone để loop
    const [index, setIndex] = useState(0);
    const [enableTransition, setEnableTransition] = useState(true);

    const startAutoSlide = (): void => {
        intervalRef.current = window.setInterval(() => {
            next();
        }, 2000);
    };

    const stopAutoSlide = (): void => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const next = () => {
        setEnableTransition(true);
        setIndex(prev => prev + 1);
    };

    const prev = () => {
        setEnableTransition(true);
        setIndex(prev => prev - 1);
    };

    // Reset index để tạo infinite effect
    useEffect(() => {
        if (index === tags.length) {
            setTimeout(() => {
                setEnableTransition(false);
                setIndex(0);
            }, 500);
        }

        if (index < 0) {
            setTimeout(() => {
                setEnableTransition(false);
                setIndex(tags.length - 1);
            }, 500);
        }
    }, [index, tags.length]);

    return (
        <div className="container flex items-center">
            {/* Title */}
            <div className="font-bold text-[#c31e40] flex text-[20px] items-center mr-4">
                <FaBoltLightning className="mr-2"/>
                Sự Kiện
            </div>
            {/* Slider + arrows at the end */}
            <div className="flex items-center">
                {/* Viewport */}
                <div className="overflow-hidden" style={{width: TAG_WIDTH * VISIBLE_COUNT}}>
                    {/* Track */}
                    <div ref={trackRef} className="flex" style={{ transform: `translateX(-${index * TAG_WIDTH}px)`,
                            transition: enableTransition
                                ? "transform 0.5s ease-in-out"
                                : "none",
                        }}>
                        {extendedTags.map((tag, i) => (
                            <div key={i} className="text-[12px] text-[#515151] flex items-center justify-center whitespace-nowrap mr-3"
                                style={{width: TAG_WIDTH}}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows always at the end */}
                <IoMdArrowDropleft size={24} color="#c31e40" className="cursor-pointer ml-2"
                    onClick={() => {
                        stopAutoSlide();
                        prev();
                        startAutoSlide();
                    }}
                />

                <IoMdArrowDropright
                    size={24}
                    color="#c31e40"
                    className="cursor-pointer"
                    onClick={() => {
                        stopAutoSlide();
                        next();
                        startAutoSlide();
                    }}
                />
            </div>
        </div>
    );
};

export default HotEvent;
