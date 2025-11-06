import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '@/css/Home.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_API_URL;
const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [producto, setProducto] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user?.id) {
      fetchUsuario(user.id);
    } else {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchUsuario = async (usuarioId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/usuario/${usuarioId}`);
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al obtener usuario");
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/producto`);
      if (Array.isArray(response.data.productos)) {
        setProducto(response.data.productos);
      } else {
        console.error("La API no devolvió un array", response.data);
        setProducto([]);
      }
    } catch (error) {
      console.error("Error al obtener productos");
      setProducto([]);
    }
  };

  // Calcular nivel y progreso
  const calcularNivel = (puntos) => {
    if (puntos < 1000) return 1;
    if (puntos < 2500) return 2;
    if (puntos < 4000) return 3;
    return 4;
  };

  const calcularProgreso = (puntos) => {
    let base = 0, meta = 0;

    if (puntos < 1000) {        // Nivel 1
      base = 0;
      meta = 1000;
    } else if (puntos < 2500) { // Nivel 2
      base = 1000;
      meta = 2500;
    } else if (puntos < 4000) { // Nivel 3
      base = 2500;
      meta = 4000;
    } else {                    // Nivel máximo
      return 100; // barra llena
    }

    const progreso = ((puntos - base) / (meta - base)) * 100;
    return Math.min(Math.max(progreso, 0), 100);
  };


  const progreso = usuario ? calcularProgreso(usuario.puntos) : 0;
  const nivel = usuario ? calcularNivel(usuario.puntos) : "-";

  return (
    <div>
      <div className='resumen-usuario'>
        <div><h2 className='font-home'>{usuario?.nombre} {usuario?.apellido}</h2></div>
        <div><h2 className='font-home'>{usuario?.localidad}</h2></div>
        <div><h2 className='font-home'>Puntos: {usuario?.puntos}</h2></div>
        <div className='niveles'>
          <h2 className='font-home'>Nivel: {nivel}</h2>
          {/* 🟪 Barra de progreso */}
          <div className='barra-progreso-container'>
            <div className='barra-progreso'>
              <motion.div
                className={`barra-progreso-fill ${nivel === 4 ? 'max' : progreso === 100 ? 'full' : ''}`}
                initial={{ width: 0 }}
                animate={{ width: `${progreso}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            {nivel === 4 ? (
              <motion.p
                className='texto-progreso max-texto'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                🏆 Nivel máximo alcanzado
              </motion.p>
            ) : (
              <motion.p
                className='texto-progreso'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {Math.round(progreso)}% hacia el próximo nivel
              </motion.p>
            )}
          </div>
        </div>




      </div>

      <div className='contenedor-destacados center'>
        {producto.map((p) => (
          <Link className='link-card' key={p._id} to={`/producto/${p._id}`}>
            <div className='card'>
              <img className='imagen-card' src={`${apiUrl}/api/uploads/${p.imagen}`} alt={p.nombre} />
              <div className='contenido-card'>
                <p>{p.nombre}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
