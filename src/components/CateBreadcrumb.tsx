const CateBreadcrumb = () =>{
    const title = [['Xã Hội','#'], ['Giáo dục Đô thị','#'],['Chính trị','#'],['Kinh tế','#'],['Góp ý sửa đối Hiến pháp','#']];
    return(
        <>
            <div className={`flex container mt-5 mb-5`}>
                <h1 className={`font-bold text-2xl border-l-6 border-[#c31e40] mr-4`}>
                    <p className={`ml-3`}>Thời Sự</p>
                </h1>
                <div className={`flex text-[14px] items-center text-gray-900`}>
                    {
                        title.map(([key, value],i) => (
                            <a key={i} href={value} className={`mr-3 ml-3 font-medium`}>{key}</a>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CateBreadcrumb;