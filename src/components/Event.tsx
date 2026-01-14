import {FaBoltLightning} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Event = ()=>{
    const [events, setEvents] = useState<{ title: string; link: string }[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3000/api/events")
            .then(res => res.json())
            .then(setEvents)
            .finally(() => setLoadingEvents(false));
    }, []);

    return (
        <>
            <div className={`container`}>
                {loadingEvents ? (
                    <div className="text-gray-500 text-sm italic">
                        Đang tải sự kiện...
                    </div>
                ) : events.length > 0 ? (
                    <div className="event-wrapper mb-4 mt-3">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold text-red-700 whitespace-nowrap flex gap-2 items-center">
                                <FaBoltLightning />
                                Sự kiện
                            </h3>

                            <div className="event-slide overflow-hidden w-full">
                                <ul className="event-track flex gap-4">
                                    {[...events, ...events].map((e, i) => (
                                        <li key={i} className="whitespace-nowrap">
                                            <Link
                                                to={`/chu-de?link=${encodeURIComponent(
                                                    e.link
                                                )}`}
                                                className="font-semibold text-[14px] text-[#515151] hover:underline"
                                            >
                                                {e.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default Event;