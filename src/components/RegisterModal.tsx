import { useState } from "react";
import { apiRegister } from "../services/api";

export default function RegisterModal({ onClose }: { onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleRegister = async () => {
        setError("");

        if (!name || !email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Email không đúng định dạng");
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu tối thiểu 6 ký tự");
            return;
        }

        const res = await apiRegister(email, password, name);

        if (!res.ok) {
            setError(res.message || "Đăng ký thất bại");
            return;
        }

        alert("Đăng ký thành công, hãy đăng nhập");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[360px] p-6 rounded">
                <h3 className="text-lg font-bold mb-4">Đăng ký</h3>

                {error && (
                    <p className="text-red-600 text-sm mb-2">
                        {error}
                    </p>
                )}

                <input
                    placeholder="Tên hiển thị"
                    className="w-full border p-2 mb-3"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Hủy</button>
                    <button
                        onClick={handleRegister}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}
