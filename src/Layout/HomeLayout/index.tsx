import HeadHome from "./HeadHome";
import FooterHome from "./FooterHome";
import Banner from "./Banner";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <HeadHome />
            <Banner images={[
                "https://cdn.giaoducthoidai.vn/images/cac98c2b2a991251162463eef8505ad4e84994922ad100253ad0e2740e517940/1.jpg",
                "https://cdn.giaoducthoidai.vn/images/cac98c2b2a991251162463eef8505ad49331570b927193522e9ad29f51e8fd01db0230d604072c709f7b416fb3f9b0bf/banner-dh-vanhien-fnx2.png",
            ]} className={`container`}
            />
            <main className="container mx-auto mt-6">
                <Outlet />
            </main>
            <Banner images={[
                "https://cdn.giaoducthoidai.vn/images/dd0228cb04d6ecc7574376a7e805a48489cc804cd1f6c462fefce0786afe75c1/coverfb.jpg",
            ]}
                className={`container`}
            />
            <FooterHome />
        </>
    );
};

export default HomeLayout;
