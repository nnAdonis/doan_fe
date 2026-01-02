import HeadHome from "./HeadHome.tsx";
import FooterHome from "./FooterHome";
import Banner from "./Banner.tsx";
import HotEvent from "../../components/HotEvent.tsx";
import CateBreadcrumb from "./CateBreadcrumb.tsx";

const HomeLayout = () =>{
    return (
        <>
            <HeadHome/>
            <Banner/>
            <HotEvent/>
            <CateBreadcrumb/>
            <FooterHome/>
        </>
    )
}

export default HomeLayout;