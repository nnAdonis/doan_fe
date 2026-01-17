export function getSlugFromUrl(url: string) {
    try {
        const pathname = new URL(url).pathname;
        return pathname.replace(/\//g, "");
    } catch {
        return "";
    }
}

