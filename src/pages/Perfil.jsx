import Usuario from '@/pages/usuarios/Usuario.jsx';
import Admin from '@/pages/usuarios/Admin.jsx';
import '@/css/Perfil.css';
import {useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext.jsx';


const Perfil = () => {
  const {user, loading} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if(!user?.id){
      console.error("Débes iniciar Sesión primero");
      navigate('/')
    }
  },[user,loading, navigate])


  return (
    <div>
      <div className=''>
      {user?.rol === 'admin' ? <Admin/> : <Usuario/>}
      </div>
    </div>
  )
}

export default Perfil;