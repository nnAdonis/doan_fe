import { useEffect, useState } from "react";

export default function Banner() {
    const images = [
        "https://cdn.giaoducthoidai.vn/images/cac98c2b2a991251162463eef8505ad4e84994922ad100253ad0e2740e517940/1.jpg",
        "https://cdn.giaoducthoidai.vn/images/cac98c2b2a991251162463eef8505ad49331570b927193522e9ad29f51e8fd01db0230d604072c709f7b416fb3f9b0bf/banner-dh-vanhien-fnx2.png",
        "https://cdn.giaoducthoidai.vn/images/cac98c2b2a991251162463eef8505ad43f25b23f19d4bab3d707df836cb99803b01c910e08e5742e02eafe80cd86978f338b47077c2798bccb0d02e90aa84afd2af4ae7461b0ccd084591665cc9fe53e/575841632-1731351114213503-8246985132650051385-n.jpg",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full h-64 ">
            <img
                src={images[index]}
                alt="banner"
                className="w-full h-full "
            />
        </div>
    );
}
