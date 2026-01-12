import HeadHome from "./HeadHome";
import FooterHome from "./FooterHome";
import Banner from "./Banner";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <HeadHome />
            <Banner />
            <main className="container mx-auto mt-6">
                <Outlet />
            </main>
            <FooterHome />
        </>
    );
};

export default HomeLayout;
