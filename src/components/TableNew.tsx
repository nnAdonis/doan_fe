import {FaStar} from "react-icons/fa";

const TableNew = () =>{
    return (
        <>
                <div className={`border border-gray-300 mb-8 `}>
                    <a href="" className={`flex bg-[#c31e40] text-white items-center justify-center uppercase font-medium pt-1 pb-1.5 pr-10 pl-10`}>
                        <FaStar className={`mr-2`}/>
                        <h3>Mới cập nhật</h3>
                    </a>
                    <div className={`text-[#4e4e4e] bg-white shadow-[4px_6px_15px_rgba(0,0,0,0.15)] p-4 font-bold leading-relaxed`}>
                        <p className={`w-[248px] border-b-1 border-gray-300 pb-1 mb-2 `}> Hãng tin Nga tường thuật phiên tòa đầu tiên với ông Maduro </p>
                        <p className={`w-[248px] border-b-1 border-gray-300 pb-1 mb-2`}> Đặt tên cơ sở giáo dục đại học và phân hiệu: Chuẩn hóa quy định </p>
                        <p className={`w-[248px] border-b-1 border-gray-300 pb-1 mb-2`}> Quyết tâm của Đan Mạch có còn kịp? </p>
                        <p className={`w-[248px] border-b-1 border-gray-300 pb-1 mb-2`}> Giá vàng hôm nay 7/1 tiếp đà tăng 900 ngàn lên mốc 158 triệu đồng/lượng </p>
                        <p className={`w-[248px]`}> Cà Mau sẽ tổ chức hội thi gạo ngon vùng ĐBSCL và Festival tôm năm 2026 </p>
                    </div>
                </div>
        </>
    )
}

export default TableNew;