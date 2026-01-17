import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

interface User {
    id: number;
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: { user: User; token: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("user");
            const savedToken = localStorage.getItem("token");

            if (savedUser && savedUser !== "undefined" && savedToken) {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch (e) {
            console.error("Auth load error:", e);
            localStorage.clear();
        }
    }, []);

    const login = ({ user, token }: { user: User; token: string }) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
};

