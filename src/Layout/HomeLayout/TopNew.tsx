// import StoryThumb from "../../components/StoryThumb.tsx";
// import Story from "../../components/Story.tsx";
// import PosterGiay from "../../components/PosterGiay.tsx";
// import Banner from "./Banner.tsx";
//
//
//
// const TopNew = ()=>{
//     interface ImgData {
//         link: string;
//         src: string;
//     }
//     const ImgChinh: ImgData[] = [
//         {
//             link: "#",
//             src: "https://cdn.giaoducthoidai.vn/images/212fc329b6cfb1e067b8c88076072f838e0fb9ab7ce9a5f295cea920651e3b389225290b8b5a41c6425f891fe07ae05b/1.jpg.webp",
//         }
//     ]
//     const ImgPhu: ImgData[] = [
//         {
//             link: "#",
//             src: "https://cdn.giaoducthoidai.vn/images/212fc329b6cfb1e067b8c88076072f838e0fb9ab7ce9a5f295cea920651e3b389225290b8b5a41c6425f891fe07ae05b/1.jpg.webp",
//         },
//         {
//             link: "#",
//             src: "https://cdn.giaoducthoidai.vn/images/212fc329b6cfb1e067b8c88076072f838e0fb9ab7ce9a5f295cea920651e3b389225290b8b5a41c6425f891fe07ae05b/1.jpg.webp",
//         },
//         {
//             link: "#",
//             src: "https://cdn.giaoducthoidai.vn/images/212fc329b6cfb1e067b8c88076072f838e0fb9ab7ce9a5f295cea920651e3b389225290b8b5a41c6425f891fe07ae05b/1.jpg.webp",
//         },
//         {
//             link: "#",
//             src: "https://cdn.giaoducthoidai.vn/images/212fc329b6cfb1e067b8c88076072f838e0fb9ab7ce9a5f295cea920651e3b389225290b8b5a41c6425f891fe07ae05b/1.jpg.webp",
//         }
//     ]
//     interface StoryData {
//         title: string;
//         time: string;
//         description: string;
//     }
//     const stories: StoryData[] = [
//         {
//             title: "Trả lại vai trò cho bộ môn",
//             time: "8 giờ trước",
//             description: "GD&TĐ - Nhìn lại chặng đường từ Đại hội XIII, kết quả đạt được cùng hạn chế, bất cập còn tồn tại gợi mở nhiều bài học kinh nghiệm có giá trị cho ngành Giáo dục."
//         }
//     ];
//     const title: StoryData[] = [
//         {
//             title: "Trả lại vai trò cho bộ môn",
//             time: "",
//             description: ""
//         },
//         {
//             title: "Trả lại vai trò cho bộ môn",
//             time: "",
//             description: ""
//         },
//         {
//             title: "Trả lại vai trò cho bộ môn",
//             time: "",
//             description: ""
//         },
//         {
//             title: "Trả lại vai trò cho bộ môn",
//             time: "",
//             description: ""
//         }
//     ];
//
//     return (
//         <>
//             <div>
//                 <div className={`grid container justify-between gap-8 grid-cols-[1fr_210px] mt-8`}>
//                     <div className={`grid grid-cols-[1fr_280px] gap-6`}>
//                         {ImgChinh.map((img, index) => (
//                             <StoryThumb key={index} img={img} />
//                         ))}
//                         {stories.map((story, index) => (
//                             <Story key={index} data={story} />
//                         ))}
//                     </div>
//                     <PosterGiay/>
//                 </div>
//                 <div className={`grid grid-cols-4 gap-4 container mt-8`}>
//                         {ImgPhu.map((img, index) => (
//                             <StoryThumb key={index} img={img} />
//                         ))}
//                         {title.map((story, index) => (
//                             <a className={`!text-[15px]`} key={index}>
//                                 <Story data={story} />
//                             </a>
//                         ))}
//
//                 </div>
//                 <Banner/>
//             </div>
//         </>
//     )
// }
//
// export default TopNew ;