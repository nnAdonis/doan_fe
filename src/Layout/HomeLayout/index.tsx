import HeadHome from "./HeadHome";
import FooterHome from "./FooterHome";
<<<<<<< HEAD
import Banner from "./Banner";
import { Outlet } from "react-router-dom";
=======
import Banner from "./Banner.tsx";
import HotEvent from "../../components/HotEvent.tsx";
import StoryThumb from "../../components/StoryThumb.tsx";
import Story from "../../components/Story.tsx";
import PosterGiay from "../../components/PosterGiay.tsx";
import Card from "../../components/Card.tsx";
import Event from "./Event.tsx";
>>>>>>> f75a30e4a261d2fb3495aaea538240b29ac2fcac

const HomeLayout = () => {
    return (
        <>
<<<<<<< HEAD
            <HeadHome />
            <Banner />
            <main className="container mx-auto mt-6">
                <Outlet />
            </main>
            <FooterHome />
=======
            <HeadHome/>
            <Banner/>
            <HotEvent/>
            <div className={`grid container justify-between gap-8 grid-cols-[1fr_210px] mt-8`}>
                <div className={`flex gap-6`}>
                    <StoryThumb/>
                    <Story/>
                </div>
                <PosterGiay/>
            </div>
            <div className={`grid grid-cols-4 gap-5 container mt-10`}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <Banner/>
            <Event/>
            <FooterHome/>
>>>>>>> f75a30e4a261d2fb3495aaea538240b29ac2fcac
        </>
    );
};

export default HomeLayout;
