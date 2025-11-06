import { useState } from "react";
import '@/css/admin/Registro.css';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        localidad: "",
        email: "",
        contraseña: "",
        puntos: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoUsuario = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            dni: formData.dni,
            localidad: formData.localidad,
            email: formData.email,
            contraseña: formData.contraseña,
            puntos: formData.puntos
        }
        try {
            const response = await axios.post(`${apiUrl}/api/usuario/registro`, nuevoUsuario, {
                withCredentials: true,
            });
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: response.data.message,
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            {
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data.message,
                        confirmButtonColor: '#d33',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de conexión',
                        text: 'No se pudo conectar con el servidor',
                        confirmButtonColor: '#d33',
                    });
                }
            }
        }
    }


    return (
        <div>
            <form className="form-registro" onSubmit={handleSubmit}>
                <div className="div-1">
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    <label>Apellido</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                    <label>Dni</label>
                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
                    <label>Localidad</label>
                    <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} />
                </div>
                <div className="div-1">

                    <label>Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    <label>Contraseaña</label>
                    <input type="text" name="contraseña" value={formData.contraseña} onChange={handleChange} />
                    <label>Puntos</label>
                    <input type="text" name="puntos" value={formData.puntos} onChange={handleChange} />
                    <button className="boton-registro" type="submit">Confirmar</button>
                </div>
            </form>
        </div>
    )
}

export default Registro