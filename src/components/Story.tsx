interface StoryData {
    title: string;
    time: string;
    description: string;
}


interface StoryProps {
    data: StoryData;
}

const Story: React.FC<StoryProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#4e4e4e]">
                {data.title}
            </h2>
            <p className="text-[#7d7d7d] italic">
                {data.time}
            </p>
            <p className="text-[#4e4e4e]">
                {data.description}
            </p>
        </div>
    );
};

export default Story;
