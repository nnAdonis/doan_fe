import StoryThumb from "./StoryThumb.tsx";

const Card = () =>{
    return(
        <>
            <a className={``}>
                <div className={`max-w-80 m-h-45`}>
                    <StoryThumb/>
                </div>
                <p className={`font-medium max-w-77`}>Đột phá đầu tư để hình thành đại học xuất sắc</p>
            </a>
        </>
    )
}

export default Card;