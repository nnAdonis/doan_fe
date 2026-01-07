
interface ImgData {
    link: string;
    src: string;
}

interface Img {
    img: ImgData;
}

const StoryThumb: React.FC<Img> = ({img}) =>{
    return (
        <>
            <a href={img.link} >
                <img src={img.src} alt=""/>
            </a>
        </>
    )
}

export default StoryThumb;