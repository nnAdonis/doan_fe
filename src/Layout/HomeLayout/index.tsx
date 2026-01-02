import HeadHome from "./HeadHome.tsx";
import FooterHome from "./FooterHome";
import Banner from "./Banner.tsx";

const HomeLayout = () =>{
    return (
        <>
            <HeadHome/>
            <Banner/>
            <FooterHome/>
        </>
    )
}

export default HomeLayout;