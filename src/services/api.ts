const API_URL = "http://localhost:3000/api";

export async function apiLogin(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function apiRegister(
    email: string,
    password: string,
    name: string
) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
    });

    const data = await res.json();
    return { ok: res.ok, ...data };
}

export async function apiGetComments(articleId: string) {
    const res = await fetch(`${API_URL}/comments/${articleId}`);
    return res.json();
}

export async function apiPostComment(
    articleId: string,
    content: string,
    token: string
) {
    const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ articleId, content })
    });
    return res.json();
}

export async function apiDeleteComment(
    id: number,
    token: string
) {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.json();
}

export async function apiUpdateComment(
    id: number,
    content: string,
    token: string
) {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    });
    return res.json();
}





