export default function VideoAd() {
    return (
        <section className="mt-12">
            <div className="border rounded p-4 bg-gray-100">
                <p className="text-sm text-gray-500 mb-2 uppercase">
                    Quảng cáo
                </p>
                <div className="aspect-video bg-black rounded overflow-hidden">
                    <video controls muted poster="https://via.placeholder.com/640x360" className="w-full h-full object-cover">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                    </video>
                </div>

                <p className="text-xs text-gray-400 mt-2 text-right">
                    Powered by DemoAds
                </p>
            </div>
        </section>
    );
}
