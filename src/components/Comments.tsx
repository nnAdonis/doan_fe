import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import {
    apiGetComments,
    apiPostComment,
    apiDeleteComment,
    apiUpdateComment
} from "../services/api";

interface Comment {
    id: number;
    name: string;
    content: string;
    created_at: string;
    user_id: number;
}

export default function Comments({ articleId }: { articleId: string }) {
    const { user, token } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    const loadComments = async () => {
        try {
            const data = await apiGetComments(articleId);
            setComments(data);
        } catch {
            setComments([]);
        }
    };

    useEffect(() => {
        loadComments();
    }, [articleId]);

    const handleSubmit = async () => {
        if (!token) {
            setShowLogin(true);
            return;
        }

        if (!content.trim()) {
            alert("Nội dung bình luận không được để trống");
            return;
        }

        try {
            await apiPostComment(articleId, content, token);
            setContent("");
            loadComments();
        } catch {
            alert("Gửi bình luận thất bại");
        }
    };

    const handleDelete = async (id: number) => {
        if (!token) return;

        if (!confirm("Xóa bình luận này?")) return;

        await apiDeleteComment(id, token);
        loadComments();
    };

    const handleEdit = (c: Comment) => {
        setEditingId(c.id);
        setEditContent(c.content);
    };

    const handleUpdate = async () => {
        if (!token || editingId === null) return;

        await apiUpdateComment(editingId, editContent, token);
        setEditingId(null);
        setEditContent("");
        loadComments();
    };

    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Bình luận</h3>

            {/* FORM BÌNH LUẬN – LUÔN HIỂN THỊ */}
            <textarea
                className="w-full border p-3 mb-3"
                rows={3}
                placeholder={
                    user
                        ? "Nhập bình luận..."
                        : "Đăng nhập để viết bình luận..."
                }
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Bình luận
                </button>
            </div>

            {/* LIST COMMENT */}
            <div className="mt-6 space-y-4">
                {comments.map(c => (
                    <div key={c.id} className="border-b pb-2">
                        <strong>{c.name}</strong>

                        {editingId === c.id ? (
                            <>
                    <textarea
                        className="w-full border p-2 mt-2"
                        rows={2}
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                    />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="text-green-600 text-sm"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="text-gray-500 text-sm"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm mt-1">{c.content}</p>

                                <span className="text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleString()}
                    </span>

                                {/* NÚT SỬA / XÓA */}
                                {user && user.id === c.user_id && (
                                    <div className="flex gap-3 mt-1 text-sm">
                                        <button
                                            onClick={() => handleEdit(c)}
                                            className="text-blue-600"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            className="text-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>


            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </div>
    );
}

