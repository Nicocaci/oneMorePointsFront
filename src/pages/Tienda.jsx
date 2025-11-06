import '@/css/Tienda.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Tienda = () => {
    const [producto, setProducto] = useState([]);
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) return;
        if (user?.id) {
            fetchProductos();
        } else {
            navigate('/')
        }
    }, [user, loading, navigate]);

    const fetchProductos = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/producto`);
            if (Array.isArray(response.data.productos)) {
                setProducto(response.data.productos)
            } else {
                console.error("La API no devolvió un array", response.data);
                setProducto([]);
            }
        } catch (error) {
            console.error("Error al obtener productos");
            setProducto([])
        }
    }
    return (
        <div>
            <div className='titulo-tienda center'>
                <p>Canjeá tus Puntos</p>
            </div>
            <div className='contenedor-tienda'>
                {producto.map((p) => (
                    <Link className='link-card' key={p._id} to={`/producto/${p._id}`}>
                        <div key={p._id} className='card-tienda'>
                            <img className='imagen-tienda' src={`${apiUrl}/api/uploads/${p.imagen}`} alt={p.nombre} />
                            <div className='card-contenido-tienda'>
                                <p>{p.nombre}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Tienda