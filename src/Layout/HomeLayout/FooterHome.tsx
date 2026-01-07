import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#c31e40] text-white mt-10 pt-10 pb-8 text-base">
            <div className="mx-auto max-w-[956px] px-4 grid grid-cols-1 md:grid-cols-[25%_40%_35%] gap-6 items-start">

                {/* CỘT 1: LOGO → CLICK VỀ TRANG CHỦ */}
                <div className="flex flex-col items-center text-center">
                    <Link to="/" className="flex flex-col items-center">
                        <img
                            src="https://cdn.giaoducthoidai.vn/assets/web/styles/img/logo.svg"
                            alt="Logo"
                            className="w-40 mb-3 brightness-0 invert cursor-pointer"
                        />
                        <p className="font-bold text-xl tracking-wide hover:underline">
                            BÁO GIÁO DỤC & THỜI ĐẠI
                        </p>
                    </Link>
                </div>

                {/* CỘT 2 */}
                <div className="space-y-3">
                    <p className="font-bold text-xl leading-7 uppercase">
                        Cơ quan của Bộ Giáo dục và Đào tạo - Diễn đàn toàn xã hội vì sự nghiệp giáo dục
                    </p>

                    <p className="text-lg">
                        Cơ quan chủ quản: <b>Bộ Giáo dục và Đào tạo</b>
                    </p>
                    <p className="text-lg">
                        Số giấy phép 479/GP-BTTTT, cấp ngày 29/10/2020, ISSN 1859-2945.
                    </p>
                    <p className="text-lg">Tổng Biên tập: Triệu Ngọc Lâm</p>
                    <p className="text-lg">
                        Phó Tổng Biên tập: Dương Thanh Hương - Nguyễn Đức Tuân
                    </p>
                    <p className="text-lg">
                        ® Ghi rõ nguồn "Báo Giáo dục & Thời đại" khi phát hành lại thông tin từ website.
                    </p>
                </div>

                {/* CỘT 3 */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-1 uppercase">
                            Trụ sở chính
                        </h3>
                        <p className="text-lg leading-7">
                            Tòa soạn: 15 Hai Bà Trưng - P.Cửa Nam - Hà Nội.<br />
                            Điện thoại: 024 3936 9800 <br />
                            Hotline: 0967 335 089 <br />
                            Email: gdtddientu@gmail.com
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-1 uppercase">
                            Liên hệ quảng cáo, truyền thông và đặt báo
                        </h3>
                        <p className="text-lg leading-7">
                            Phòng Truyền thông và Dự án <br />
                            Hotline: 0886 059 988
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
