import { useState } from 'react';
import '@/css/admin/Admin.css';
import Registro from '@/components/admin/Registro.jsx';
import UsuariosRegistrados from '@/components/admin/UsuariosRegistrados.jsx';
import NuevoProducto from '@/components/admin/NuevoProducto.jsx';
import AddViaje from '@/components/admin/AddViaje.jsx';
import RegistroViajes from '@/components/admin/RegistroViajes';



const Admin = () => {
  const [activeTab, setActiveTab] = useState('registro');



  return (
    <div className='admin'>
      {/* <h1 className='titulo-admin center'>Perfil Admin</h1> */}
      <div className='contenido-admin'>
        <div className='li-admin' >
          <ul className='pages-admin'>
            <li className={`link-admin ${activeTab === 'registro' ? 'activo' : ''}`} onClick={() => setActiveTab('registro')}>Registro</li>
            <li className={`link-admin ${activeTab === 'usuarios' ? 'activo' : ''}`} onClick={() => setActiveTab('usuarios')}>Usuarios</li>
            <li className={`link-admin ${activeTab === 'crearViaje' ? 'activo' : ''}`} onClick={() => setActiveTab('crearViaje')}>Crear Viaje</li>
            <li className={`link-admin ${activeTab === 'nuevoProducto' ? 'activo' : ''}`} onClick={() => setActiveTab('nuevoProducto')}>Nuevo Producto</li>
            <li className={`link-admin ${activeTab === 'registroViajes' ? 'activo' : ''}`} onClick={() => setActiveTab('registroViajes')}>Registro Viajes</li>
          </ul>
        </div>
        <div>
          {activeTab === 'registro' && (
            <Registro />
          )}
          {activeTab === 'usuarios' && (
            <UsuariosRegistrados />
          )}
          {activeTab === 'crearViaje' && (
            <AddViaje />
          )}
          {activeTab === 'nuevoProducto' && (
            <NuevoProducto />
          )}
          {activeTab === 'registroViajes' && (
            <RegistroViajes />
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin