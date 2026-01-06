import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./Layout/HomeLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Category from "./pages/Category";

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        {/* Trang chủ */}
                        <Route index element={<Home />} />

                        {/* Trang chi tiết */}
                        <Route path="detail" element={<Detail />} />

                        {/* Trang danh mục */}
                        <Route path="category/:slug" element={<Category />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
