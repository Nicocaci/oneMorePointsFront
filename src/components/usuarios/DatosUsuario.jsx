import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/AuthContext.jsx';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

const DatosUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        localidad: "",
        email: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user?.id) {
            fetchUsuario(user.id);
        } else {
            navigate('/')
        }
    }, [user, loading, navigate])

    const fetchUsuario = async (usuarioId) => {
        try {
            const response = await axios.get(`${apiUrl}/api/usuario/${usuarioId}`);
            setUsuario(response.data)
            setFormData(response.data)
        } catch (error) {
            console.error("Error al obtener el usuario");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/usuario/${usuario._id}`,
                formData)
            Swal.fire({
                title: "Actualizamos los datos nuevos?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `No guardar`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Datos Actualizados Correctamente!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Datos no Actualizados", "", "info");
                }
            });
        } catch (error) {
            console.error("Error al actualizar los datos del usuario", error);
            alert("Hubo un error al actualizar tus datos.");
        }
    }

    // 🔑 función para chequear si hubo cambios
    const isFormChanged = () => {
        if (!usuario) return false;
        return (
            formData.nombre !== usuario.nombre ||
            formData.apellido !== usuario.apellido ||
            formData.dni !== usuario.dni ||
            formData.localidad !== usuario.localidad
            // email no lo comparo porque está bloqueado
        );
    };

    return (
        <div>
            <div className="datospersonales">
                <form className="form-usuario" onSubmit={handleUpdate}>
                    <div className="d1">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                        <label>Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                        <label>Dni</label>
                        <input type="number" name="dni" value={formData.dni} onChange={handleChange} />
                    </div>

                    <div className="d1">
                        <label>Localidad</label>
                        <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} />
                        <label>Email</label>
                        <input className="input-email" type="text" name="email" value={formData.email} onChange={handleChange} disabled />
                        <input
                            type="hidden"
                            name="email"
                            value={formData.email}
                        />
                        <button className={`boton-actualizar ${!isFormChanged() ? "boton-deshabilitado" : "" }`}
                            type="submit"
                            disabled={!isFormChanged()}
                        >Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DatosUsuario;