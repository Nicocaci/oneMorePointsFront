import { useState } from 'react';
import axios from 'axios';
import '@/css/admin/NuevoProducto.css';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_API_URL; 

const NuevoProducto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        puntos: "",
        imagen: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            imagen: e.target.files[0] // 👉 guarda el archivo en el state
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 👉 usamos FormData para enviar texto + archivo
            const data = new FormData();
            data.append("nombre", formData.nombre);
            data.append("puntos", formData.puntos);
            if (formData.imagen) {
                data.append("imagen", formData.imagen);
            }

            const response = await axios.post(
                `${apiUrl}/api/producto/crear-producto`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Producto creado con éxito',
                text: response.data.message,
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
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
    };
    return (
        <div className='contenedor-productos'>
            <form className='form-producto' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='flex-producto'>
                    <label>Nombre</label>
                    <input type="text" name='nombre' value={formData.nombre} onChange={handleChange} />
                    <label >Puntos</label>
                    <input type="number" name='puntos' value={formData.puntos} onChange={handleChange} />
                </div>
                <div className='flex-producto'>
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button className='boton-producto' type='submit'>Confirmar</button>
                </div>
            </form>
        </div>
    )
}

export default NuevoProducto