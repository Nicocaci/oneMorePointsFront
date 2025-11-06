import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@/css/admin/ListaUsuarios.css';
import Modal from 'react-modal';

const apiUrl = import.meta.env.VITE_API_URL;

ModuleRegistry.registerModules([AllCommunityModule]);

const UsuariosRegistrados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Para el modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [columnDefs] = useState([
    { headerName: "Nombre", field: "nombre", sortable: true, filter: true },
    { headerName: "Apellido", field: "apellido", sortable: true, filter: true },
    { headerName: "DNI", field: "dni", sortable: true, filter: true },
    { headerName: "Localidad", field: "localidad", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Rol", field: "rol", sortable: true, filter: true },
    {
      headerName: "Viajes",
      field: "viajes",
      cellRenderer: (params) => (
        <button onClick={() => openModal(params.data)}>Ver viajes</button>
      )
    }]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/usuario`, { withCredentials: true });
      if (Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al obtener Usuarios", error);
      setUsuarios([]);
    }
  };

    const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  return (
    <div className="contenedor-usuarios">
      <div className="ag-theme-alpine" style={{ height: 400, width: "70%", margin:"auto"}}>
        <AgGridReact
          rowData={usuarios}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalle de Viajes"
        ariaHideApp={false}
        style={{
          content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)' }
        }}
      >
        <h2>Viajes de {selectedUser?.nombre}</h2>
        <button onClick={closeModal}>Cerrar</button>
        {selectedUser?.viajes.length ? (
          <ul>
            {selectedUser.viajes.map((viaje) => (
              <li key={viaje._id}>
                <strong>Destino:</strong> {viaje.destino} <br />
                <strong>Check In:</strong> {new Date(viaje.check_in).toLocaleDateString()} <br />
                <strong>Check Out:</strong> {new Date(viaje.check_out).toLocaleDateString()} <br />
                <strong>Puntos:</strong> {viaje.puntos}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tiene viajes registrados</p>
        )}
      </Modal>
    </div>
  );
};

export default UsuariosRegistrados;
