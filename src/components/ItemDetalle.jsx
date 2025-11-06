import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '@/css/ItemDetalle.css';
const apiUrl = import.meta.env.VITE_API_URL;

const ItemDetalle = () => {
    const { prodId } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/api/producto/${prodId}`)
                console.log("Producto obtenido:", response.data);
                setProducto(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError("Error al obtener el producto")
                setProducto(null)
            } finally {
                setLoading(false)
            }
        };


        fetchProductos();
    }, [prodId]);

    if (loading) {
        return <p>Cargando Productos....</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!producto) {
        return <p>Producto no encontrado</p>
    }

    return (
        <div key={producto?._id} className='contenedor-detalle'>
            <div>
                <img className='img-detalle' src={`${apiUrl}/api/uploads/${producto.imagen}`} alt={producto?.nombre} />
            </div>
            <div className='contenido-detalle'>
                <h2>{producto?.nombre}</h2>
                <div className='grid-niveles'>
                    <div>
                        <ul className='li-none'>
                            <li>Nivel 1: 15% OFF</li>
                            <li>Nivel 2: 30% OFF</li>
                            <li>Nivel 3: 50% OFF</li>
                        </ul>
                    </div>
                    <div>
                        <ul className='li-none'>
                            <li>{producto?.puntos}</li>
                            <li>{producto?.puntos}</li>
                            <li>{producto?.puntos}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p><strong>Descripción:</strong></p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magnam necessitatibus commodi modi provident reprehenderit ipsum odit, consequatur quas, aliquid aspernatur ut. Quo odit optio, facilis quas laboriosam deleniti hic!</p>
                </div>
                <div>
                    <button
                        className='boton-detalle'
                        onClick={() => alert('Canje Realizado')}>
                        Canjeár Puntos</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetalle;