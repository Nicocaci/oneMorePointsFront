import { useState, useEffect } from 'react';
import axios from 'axios';
import '@/css/admin/RegistroViajes.css';
import Select from 'react-select';

const apiUrl = import.meta.env.VITE_API_URL;

const RegistroViajes = () => {
    const [email, setEmail] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [viajes, setViajes] = useState([]);
    const [error, setError] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

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
            setUsuarios([])
        }
    }

    const fetchViajes = async (email) => {
        try {
            setError("");
            const res = await axios.get(`${apiUrl}/api/usuario/viajes`, {
                params: { email },  // sigue funcionando con backend actual
            });
            setViajes(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error al buscar viajes");
        }
    };

    // Cuando seleccionás un usuario en el Select
    const handleSelectChange = (selected) => {
        setUsuarioSeleccionado(selected);
        if (selected) {
            fetchViajes(selected.value);
        } else {
            setViajes([]);
        }
    };
    return (
        <div className='contenedor-viajes-admin'>
            <div className='input-viajes'>
                <Select
                    options={usuarios.map(u => ({
                        value: u.email,
                        label: `${u.nombre} ${u.apellido}`
                    }))}
                    placeholder='Seleccionar pasajero...'
                    onChange={(selected) => {
                        setUsuarioSeleccionado(selected);
                        if (selected) {
                            fetchViajes(selected.value); // ahora manda email
                        } else {
                            setViajes([]);
                        }
                    }}
                    value={usuarioSeleccionado}
                />
            </div>


            {error && <p style={{ color: "red" }} >{error}</p>}

            {viajes.length > 0 && (
                <div>
                    <ul className='list-viajes'>
                        {viajes.map((v) => (
                            <li className='contenedor-list-viajes' key={v._id}>
                                {v.destino} ({new Date(v.check_in).toLocaleDateString()} →{" "}
                                {new Date(v.check_out).toLocaleDateString()}) - {v.puntos} pts
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default RegistroViajes;