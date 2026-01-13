
const ScrollableLinks = () => {
    const data = [
        { text: "xét nghiệm nipt", suffix: " tại Diag", url: "https://diag.vn/panel/goi-xet-nghiem-nipt/" },
        { text: "tầm soát ung thư", suffix: " tại Diag", url: "https://diag.vn/panel/goi-xet-nghiem-tam-soat-ung-thu/" },
        { prefix: "Tìm hiểu ", text: "std là gì", url: "https://diag.vn/blog/std/std-la-gi/" },
        { prefix: "Đặt vé xe khách liên tỉnh trên ", text: "MoMo", suffix: " giá rẻ, tiện lợi", url: "https://www.momo.vn/ve-xe" },
        { prefix: "Những mẫu ", text: "Hộp quà tết", suffix: " đẹp 2026", url: "https://ansgift.vn/collections/qua-tet" },
        { prefix: "Trung tâm ", text: "Jaxtina English Center", suffix: " uy tín", url: "https://jaxtina.com/" },
        { prefix: "Explorer davantage ", text: "Asia voyage", url: "https://autourasia.fr/" },
    ];

    return (
        <div className="max-w-[400px] border border-gray-300 bg-white shadow-sm overflow-hidden">
            {/* - h-[135px]: Chiều cao này được tính toán để khớp với khoảng 3 dòng (mỗi dòng ~45px).
          - overflow-y-auto: Hiện thanh cuộn khi nội dung vượt quá 3 dòng.
          - scrollbar-thin: (Tùy chọn) giúp thanh cuộn gọn gàng hơn.
      */}
            <ul className="m-0 p-0 max-h-[142px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                {data.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start px-4 py-3 border-b border-dotted border-gray-400 last:border-none hover:bg-gray-50 transition-colors"
                    >
                        <span className="mr-3 mt-1 text-[10px] text-gray-500 font-bold">○</span>

                        <span className="text-sm text-gray-700 leading-tight">
              {item.prefix && <span>{item.prefix}</span>}
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-black hover:text-blue-600"
                            >
                {item.text}
              </a>
                            {item.suffix && <span>{item.suffix}</span>}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScrollableLinks;