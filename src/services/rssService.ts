const API_URL = "http://localhost:3000/api";

export const getRss = async (url: string) => {
    const res = await fetch(
        `${API_URL}/rss?url=${encodeURIComponent(url)}`
    );
    return res.json();
};

export const getDetail = async (link: string) => {
    const res = await fetch(
        `${API_URL}/detail?link=${encodeURIComponent(link)}`
    );
    return res.json();
};
