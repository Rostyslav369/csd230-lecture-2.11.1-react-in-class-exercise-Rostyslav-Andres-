import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
        navigate("/login", { replace: true });
    }, []);

    return <div style={{ textAlign: "center", marginTop: "50px" }}>Logging out...</div>;
};

export default Logout;