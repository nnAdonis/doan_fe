import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./Layout/HomeLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Topic from "./pages/Topic";
import {Category} from "./pages/Category";
import ScrollToTop from "./components/ScrollToTop";
import {Search} from "./pages/Search.tsx";

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        {/* Trang chủ */}
                        <Route index element={<Home />} />

                        {/* Trang chi tiết */}
                        <Route path="detail" element={<Detail />} />

                        {/* Trang danh mục */}
                        <Route path="category/:slug" element={<Category />} />

                        <Route path="/chu-de" element={<Topic />} />

                        <Route path="/search" element={<Search />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
