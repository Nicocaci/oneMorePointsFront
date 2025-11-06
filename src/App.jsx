import './App.css';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Viajes from './pages/Viajes.jsx';
import Tienda from './pages/Tienda.jsx';
import Perfil from './pages/Perfil.jsx';
import Footer from './components/Footer.jsx';
import ItemDetalle from './components/ItemDetalle.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


function AppLayOut() {
  const location = useLocation();
  const hideNavBar = location.pathname === "/";
  const hideFooter = location.pathname === "/";


  return (
    <>
      {!hideNavBar && <Navbar />}
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/viajes" element={<Viajes />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/producto/:prodId" element={<ItemDetalle />} />
          </Routes>
        </main>
      </AuthProvider>
      {!hideFooter && <Footer />}
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppLayOut />
    </BrowserRouter>
  );
}

export default App;
