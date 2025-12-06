import HeadHome from "./HeadHome.tsx";
import FooterHome from "./FooterHome";
import Poster from "../../pages/HomePage/Poster.tsx";

const HomeLayout = () =>{
    return (
        <>
            <HeadHome/>
            <Poster/>
            <FooterHome/>
        </>
    )
}

export default HomeLayout;