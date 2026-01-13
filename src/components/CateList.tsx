export default function CateList() {
    const menus = [
        "GIÁO DỤC",
        "THỜI SỰ",
        "GIÁO DỤC PHÁP LUẬT",
        "KẾT NỐI",
        "MEDIA",
    ];

    return (
        <div className="container mt-6">
            <div className="flex rounded-t-xl overflow-hidden">
                {menus.map((item, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-[#c31e40] text-white text-center
                       py-4 font-semibold uppercase
                       border-r border-red-500 last:border-r-0
                       hover:bg-red-300 cursor-pointer
                       transition"
                    >
                        <a href="">{item}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
