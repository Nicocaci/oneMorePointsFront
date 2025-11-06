import { useContext, useState } from 'react';
import '@/css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                `${apiUrl}/api/usuario/iniciarsesion`,
                { email, contraseña },
                { headers: { "Content-Type": "application/json" }, withCredentials: true },
            );
            Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                text: "Bienvenido a OneMorePoints",
                icon: "success",
                showConfirmButton: false, // Oculta el botón
                timer: 2000,              // Duración de 2 segundos (2000 ms)
                timerProgressBar: true    // Opcional: muestra una barra de progreso del tiempo
            }).then(() => {
                const { usuario, token } = response.data;
                login({
                    id: usuario._id,
                    email: usuario.email,
                    rol: usuario.rol,
                    token: token,
                });

                navigate('/home')
            });
        } catch (error) {
            if (error.response) {
                // 🔥 Mostrar SweetAlert en caso de error
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message || "Error en el inicio de sesión",
                    icon: "error",
                    confirmButtonText: "Intentar nuevamente",
                    customClass: {
                        confirmButton: "boton-swal-error" // Clase personalizada
                    }
                });
            } else {
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor",
                    icon: "warning",
                    confirmButtonText: "Reintentar",
                    customClass: {
                        confirmButton: "boton-swal-error" // Clase personalizada
                    }
                });
            }
        };
    };

    return (
        <div className='seccion-login'>
            <div className='contenedor-imagen'>
                <img className='imagen-login' src="/montañas.jpg" alt="montañas" />
            </div>
            <div className='contenedor-2'>
                <img className='logo2' src="/logo_omt.gif" alt="logo" />
                <form className='form-login' onSubmit={handleSubmit}>
                    {/* <h1 className='titulo-login center'>LOGO</h1> */}
                    <div className='contenido-form'>
                        <label htmlFor="">Email</label>
                        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="">Contraseña</label>
                        <input type="password" name='contraseña' value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                        <button className='boton-login' type='submit'>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;