import StoryThumb from "../../components/StoryThumb.tsx";
import Story from "../../components/Story.tsx";
import PosterGiay from "../../components/PosterGiay.tsx";
import Banner from "./Banner.tsx";



const TopNew = ()=>{
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
            description: "GD&TĐ - Theo các chuyên gia..."
        }
    ];
    const title: StoryData[] = [
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "",
            description: ""
        },
        {
            title: "Trả lại vai trò cho bộ môn",
            time: "",
            description: ""
        }
    ];

    return (
        <>
            <div>
                <div className={`grid container justify-between gap-8 grid-cols-[1fr_210px] mt-8`}>
                    <div className={`grid grid-cols-[1fr_280px] gap-6`}>
                        {ImgChinh.map((img, index) => (
                            <StoryThumb key={index} img={img} />
                        ))}
                        {stories.map((story, index) => (
                            <Story key={index} data={story} />
                        ))}
                    </div>
                    <PosterGiay/>
                </div>
                <div className={`grid grid-cols-4 gap-5 container mt-10`}>
                        {ImgPhu.map((img, index) => (
                            <StoryThumb key={index} img={img} />
                        ))}
                        {title.map((story, index) => (
                            <a className={``} key={index}>
                                <Story data={story} />
                            </a>
                        ))}

                </div>
                <Banner/>
            </div>
        </>
    )
}

export default TopNew ;