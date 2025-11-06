import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id || decoded._id,
                    email: decoded.email,
                    rol: decoded.rol,
                    token
                });
            } catch (error) {
                console.error("Token inválido:", error);
                Cookies.remove("access_token");
            }
        }
        setLoading(false);
    }, []);

    const login = (usuarioData) => {
        // también normalizamos aquí
        setUser({
            id: usuarioData.id || usuarioData._id,
            email: usuarioData.email,
            rol: usuarioData.rol,
            token: usuarioData.token
        });
    };

    const logOut = () => {
        Cookies.remove('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login,loading, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

