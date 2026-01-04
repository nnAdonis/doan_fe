import HeadHome from "./HeadHome.tsx";
import FooterHome from "./FooterHome";
import Banner from "./Banner.tsx";
import HotEvent from "../../components/HotEvent.tsx";

const HomeLayout = () =>{
    return (
        <>
            <HeadHome/>
            <Banner/>
            <HotEvent/>
            <FooterHome/>
        </>
    )
}

export default HomeLayout;