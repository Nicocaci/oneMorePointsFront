import '@/css/NavBar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => {
   

    const handleLogOut = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Estás seguro de que deseas salir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: "custom-swal-confirm",
                cancelButton: "custom-swal-cancel"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post(
                        `${apiUrl}/api/usuario/cerrarsesion`,
                        {},
                        { withCredentials: true }
                    );

                    Swal.fire({
                        title: "Sesión cerrada",
                        text: "Redirigiendo al login...",
                        icon: "success",
                        timer: 2000, // ⏳ 2 segundos antes de redirigir
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        window.location.href = "/"; // Redirige después del timer
                    }, 2000);
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }
        })
    }
    return (
        <div className='contenedor-navbar'>
            <div className='contenido-flex'>
                <img className='logo' src="/logo_omt.gif" alt="logo" />
                <ul className="contenido-li">
                    <li><Link className='contenido-li' to="/home">Inicio</Link></li>
                    <li><Link className='contenido-li' to="/tienda">Tienda</Link></li>
                    <li><Link className='contenido-li' to="/viajes">Viajes</Link></li>
                    <li><Link className='contenido-li' to="/perfil">Perfil</Link></li>
                    <li><Link className='contenido-li' to="#"
                        onClick={(e) => {
                            e.preventDefault(); // evita que redirija solo
                            handleLogOut();
                        }}>Cerrar Sesión</Link></li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar;