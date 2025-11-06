import { useState, useEffect, useContext } from 'react';
import '@/css/Viajes.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Viajes = () => {
  const [usuario, setUsuario] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user?.id) {
      fetchUsuario(user.id);
    } else {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const fetchUsuario = async (usuarioId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/usuario/${usuarioId}`,
        { withCredentials: true }
      );
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al obtener usuario", error);
    }
  };

  if (loading) {
    return <p className="loading-viajes">Cargando...</p>;
  }

  if (!usuario) {
    return <p className="loading-viajes">Cargando datos del usuario...</p>;
  }

  if (!usuario.viajes || usuario.viajes.length === 0) {
    return <p className="loading-viajes">No tenés viajes registrados.</p>;
  }

  return (
    <div>
      {/* <div className="titulo-viajes center">
        <h1>Registro de Viajes</h1>
      </div> */}
      <div className="contenedor-viajes">
        <div className='viajes-list'>
        {usuario.viajes.map((v) => (
          <div key={v._id} className="card-viajes">
            <div className='div-1'>
              <img className='img-viajes'  src={v.imagen || "/cancun.jpg"} alt={v.destino} />
            </div>
            <div className='div-viajes'>
              <p>Destino: {v.destino}</p>
            </div>
            <div className='div-viajes'>
              <p>Check In:{new Date(v.check_in).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
            </div>
            <div className='div-viajes'>
              <p>Check Out: {new Date(v.check_out).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
            </div>
            <div className='div-viajes'>
              <p>Puntos: {v.puntos}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Viajes;
