import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@/css/admin/AddViaje.css';
import Swal from 'sweetalert2';
import Select from 'react-select';

const apiUrl = import.meta.env.VITE_API_URL;

const AddViaje = () => {
    const [viaje, setViaje] = useState({
        destino: "",
        check_in: "",
        check_out: "",
        pasajeros: "",
        precio: ""
    });
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/usuario`, {
                withCredentials: true
            })
            if (Array.isArray(response.data)) {
                setUsuarios(response.data);
            } else {
                setUsuarios([])
            }
        } catch (error) {
            console.error("Error al obtener Usuarios", error);
            setUsuarios([]);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setViaje(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!viaje.precio || Number(viaje.precio) <= 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Precio inválido',
                text: 'El precio debe ser mayor a 0',
                confirmButtonColor: '#ff7d12',
            });
        }
        try {
            const nuevoViaje = {
                destino: viaje.destino,
                check_in: viaje.check_in,
                check_out: viaje.check_out,
                pasajeros: viaje.pasajeros,
                precio: Number(viaje.precio)
            };
            const response = await axios.post(`${apiUrl}/api/viaje/crear-viaje`, nuevoViaje, {
                withCredentials: true
            });
            Swal.fire({
                icon: 'success',
                title: 'Viaje Agregado Correctamente',
                text: response.data.message,
                confirmButtonColor: '#ff7d12',
            }).then(() => {
                setViaje({
                    destino: "",
                    check_in: "",
                    check_out: "",
                    pasajeros: "",
                    precio: ""
                });
            });
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className='contenedor-nuevoviaje'>
            <form className='form-viaje' onSubmit={handleSubmit}>
                <div className='flex-viaje'>
                    <label>Destino</label>
                    <input type="text" name='destino' value={viaje.destino} onChange={handleChange} />
                    <label>Check In</label>
                    <input type="date" name='check_in' value={viaje.check_in} onChange={handleChange} />
                    <label>Check Out</label>
                    <input type="date" name='check_out' value={viaje.check_out} onChange={handleChange} />
                </div>
                <div className='flex-viaje'>
                    <label>Pasajeros</label>
                    <Select
                        isMulti
                        options={usuarios.map(u => ({ value: u._id, label: `${u.nombre} ${u.apellido}` }))}
                        placeholder="Seleccionar pasajeros..."
                        onChange={(selected) => {
                            const values = selected.map(s => s.value);
                            setViaje(prev => ({ ...prev, pasajeros: values }));
                        }}
                    />
                    <label>Precio</label>
                    <input type="number" name='precio' value={viaje.precio} onChange={handleChange} required />
                    <button className='boton-viaje' type='submit'>Confirmar Viaje</button>
                </div>
            </form>
        </div>
    )
}

export default AddViaje