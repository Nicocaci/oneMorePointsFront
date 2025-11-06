import '@/css/Usuario.css';
import DatosUsuario from '../../components/usuarios/DatosUsuario.jsx';
import {useState } from 'react';

const Usuario = () => {
  const [activeTab, setActiveTab] = useState('datos');

  return (
    <div>
        <p className='titulo-usuario center'>Perfil Usuario</p>
        <div className='contenedor-usuario'>
          <div >
            <ul className='pages-usuario'>
              <li className={`link-usuario ${activeTab === 'datos' ? 'activo' : ''}`} onClick={() => setActiveTab('datos')}>Datos Personales</li>
            </ul>
          </div>
          <div>
            {activeTab === 'datos' && (
              <DatosUsuario/>
            )}
          </div>
        </div>
    </div>
  )
}

export default Usuario;