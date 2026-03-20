import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import api from "../api/axiosConfig";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const isExpired = queryParams.get("expired");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { username, password });
            setToken(res.data.token);
            navigate("/books", { replace: true });
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Inventory Login</h1>

            {isExpired && (
                <div
                    style={{
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        padding: "12px",
                        borderRadius: "5px",
                        display: "inline-block",
                        marginBottom: "20px",
                        border: "1px solid #ffeeba",
                        fontWeight: "bold"
                    }}
                >
                    ⚠️ Your session has expired. Please log in again.
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Username:</label><br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={{ width: "100%" }}>Login</button>
            </form>
        </div>
    );
};

export default Login;