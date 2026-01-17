import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {apiLogin} from "../services/api";
import RegisterModal from "./RegisterModal";

export default function LoginModal({onClose}: { onClose: () => void }) {
    const {login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const data = await apiLogin(email, password);

        if (!data.token || !data.user) {
            setError(data.message || "Đăng nhập thất bại");
            return;
        }

        login({user: data.user, token: data.token});
        onClose();
    };

    if (showRegister) {
        return <RegisterModal onClose={onClose}/>;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[360px] p-6 rounded">
                <h3 className="text-lg font-bold mb-4">Đăng nhập</h3>

                <input placeholder="Email" className="w-full border p-2 mb-3" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Mật khẩu" className="w-full border p-2 mb-4"
                       value={password}
                       onChange={e => setPassword(e.target.value)}/>

                {error && (
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                )}

                <div className="flex justify-between items-center">
                    <button onClick={() => setShowRegister(true)} className="text-sm text-blue-600">
                        Chưa có tài khoản?
                    </button>
                    <button onClick={handleLogin} className="bg-red-600 text-white px-4 py-2 rounded">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}
