import { useState } from "react";

export default function AdsPopup() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed right-4 bottom-4 z-50 w-[326px] bg-white border shadow-lg rounded-md">
            {/* Header */}
            <div className="relative bg-red-600 text-white text-center py-2 font-bold">
                cellphoneS
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-1 right-2 text-white hover:text-gray-200"
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-2 p-2 text-sm">
                {/* Item 1 */}
                <div className="border p-2 text-center">
                    <img
                        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MV7N2_AV1?wid=572&hei=572&fmt=jpeg&qlt=95"
                        alt="AirPods"
                        className="mx-auto h-24"
                    />
                    <p className="font-semibold mt-2">
                        Tai nghe Bluetooth Apple AirPods 4 | Chính hãng
                    </p>
                    <p className="line-through text-gray-400">3.790.000đ</p>
                    <span className="text-red-600 font-bold">-5%</span>
                </div>

                {/* Item 2 */}
                <div className="border p-2 text-center">
                    <img
                        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWTY3_AV1?wid=572&hei=572&fmt=jpeg&qlt=95"
                        alt="EarPods"
                        className="mx-auto h-24"
                    />
                    <p className="font-semibold mt-2">
                        Tai nghe Apple EarPods Lightning
                    </p>
                    <p className="line-through text-gray-400">790.000đ</p>
                    <span className="text-red-600 font-bold">-36%</span>
                </div>
            </div>
        </div>
    );
}
