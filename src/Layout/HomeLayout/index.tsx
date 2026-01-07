import HeadHome from "./HeadHome.tsx";
import FooterHome from "./FooterHome";
import Banner from "./Banner.tsx";
import HotEvent from "../../components/HotEvent.tsx";

import Event from "./Event.tsx";
import TopNew from "./TopNew.tsx";

const HomeLayout = () =>{
    return (
        <>
            <HeadHome/>
            <Banner/>
            <HotEvent/>
            <TopNew/>
            <Event/>
            <FooterHome/>
        </>
    )
}

export default HomeLayout;