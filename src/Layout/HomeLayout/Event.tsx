import TableNew from "../../components/TableNew.tsx";
import StoryThumb from "../../components/StoryThumb.tsx";
import Story from "../../components/Story.tsx";
// import Story from "../../components/Story.tsx";

const Event = () =>{
    interface ImgData {
        link: string;
        src: string;
    }
    const ImgChinh: ImgData[] = [
        {
            link: "#",
            src: "https://cdn.giaoducthoidai.vn/images/5866a67bcdeb3affeba9d430e8d8f5f95c0f27129eeb730ac4b7d96351be97b3e78b71cec42b35ed564305a334f0be7a8baea75b08e157ee24eff66008afb2d9/loat-hiep-si-bi-khoi-to-1.jpg.webp",
        }
    ]
    const ImgPhu: ImgData[] = [
        {
            link: "#",
            src: "https://cdn.giaoducthoidai.vn/images/5866a67bcdeb3affeba9d430e8d8f5f95c0f27129eeb730ac4b7d96351be97b3e78b71cec42b35ed564305a334f0be7a8baea75b08e157ee24eff66008afb2d9/loat-hiep-si-bi-khoi-to-1.jpg.webp",
        },
        {
            link: "#",
            src: "https://cdn.giaoducthoidai.vn/images/5866a67bcdeb3affeba9d430e8d8f5f95c0f27129eeb730ac4b7d96351be97b3e78b71cec42b35ed564305a334f0be7a8baea75b08e157ee24eff66008afb2d9/loat-hiep-si-bi-khoi-to-1.jpg.webp",
        },
        {
            link: "#",
            src: "https://cdn.giaoducthoidai.vn/images/5866a67bcdeb3affeba9d430e8d8f5f95c0f27129eeb730ac4b7d96351be97b3e78b71cec42b35ed564305a334f0be7a8baea75b08e157ee24eff66008afb2d9/loat-hiep-si-bi-khoi-to-1.jpg.webp",
        },
        {
            link: "#",
            src: "https://cdn.giaoducthoidai.vn/images/5866a67bcdeb3affeba9d430e8d8f5f95c0f27129eeb730ac4b7d96351be97b3e78b71cec42b35ed564305a334f0be7a8baea75b08e157ee24eff66008afb2d9/loat-hiep-si-bi-khoi-to-1.jpg.webp",
        }
    ]

    interface StoryData {
        title: string;
        time: string;
        description: string;
    }
    const stories: StoryData[] = [
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "8 giờ trước",
            description: "GD&TĐ - Binh sĩ Lực lượng Vũ trang Ukraine cảnh báo về một thảm họa sắp xảy ra ở Lyman khi các đơn vị Nga đang bao vây thành phố, giống như ở Pokrovsk."
        }
    ];
    const titlePhu: StoryData[] = [
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "8 giờ trước",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "8 giờ trước",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "8 giờ trước",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "8 giờ trước",
            description: ""
        }
    ];

    return (
        <>
            <div className={`container grid grid-cols-[1fr_280px] gap-6`}>
                <div className={``}>
                    <div className={`text-[#c31e40] font-bold text-[20px] mb-7 border-b-1`}>
                        <a href="">Toàn Cảnh - Sự kiện</a>
                    </div>
                    <div className={`grid grid-cols-[1fr_320px] gap-6`}>
                        <div>
                            {ImgChinh.map((img, index) => (
                                <StoryThumb key={index} img={img} />
                            ))}
                            {stories.map((story, index) => (
                                <Story key={index} data={story} />
                            ))}
                        </div>
                        <div className={`grid grid-cols-[1fr_160px] gap-2`}>
                            {ImgPhu.map((img, index) => (
                                <StoryThumb key={index} img={img} />
                            ))}
                            {titlePhu.map((story, index) => (
                                <a href="">

                                    <Story key={index} data={story} />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
                <div className={`w-[280px]`}>
                    <TableNew/>
                    <div className={`bg-[#ececec] rounded-sm p-2 shadow-[4px_6px_15px_rgba(0,0,0,0.15)]`}>
                        <h2 className={`border-l-6 pl-3 font-bold text-[20px] text-[#c31e40] uppercase`}>
                            <a href="">Suy Ngẫm</a>
                        </h2>
                        <h3 className={`font-bold mt-2 mb-2 text-[18px]`}>
                            <a href="">
                                80 năm lá phiếu đầu tiên - bài học chủ động tham gia kiến tạo
                            </a>
                        </h3>
                        <p className={`italic text-[14px]`}>
                            GD&TĐ - Có một sự kiện lịch sử mà nếu không được bàn luận kỹ, các bạn Gen Z có khi chỉ nghĩ nó là một dòng chữ khô khan trên sách giáo khoa: Cuộc Tổng tuyển cử ngày 6 tháng 1 năm 1946.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Event;