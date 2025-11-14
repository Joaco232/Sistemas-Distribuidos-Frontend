import Register from "./register/Register";
import Login from "./login/Login";
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import ProfileEdit from "./editProfile/editProfile";
import Home from "./home/Home";
import EditPassword from "./editPassword/editPassword";
import EditProfileName from "./editProfileName/editProfileName";
import {useEffect} from "react";

function TitleUpdater() {
    const location = useLocation();

    useEffect(() => {
        const titles = {
            "/home": "Inicio | MovieNow",
            "/login": "Iniciar Sesión | MovieNow",
            "/signup": "Registrarse | MovieNow",
            "/profile": "Mi Perfil | MovieNow",
            "/edit-profile": "Editar Perfil | MovieNow",
            "/edit-password": "Cambiar Contraseña | MovieNow",
            "/edit-profile-name": "Editar Nombre | MovieNow",
        };

        document.title = titles[location.pathname] || "MovieNow";
    }, [location]);

    return null;
}

function App() {
    return (
        <Router>
            {/* este componente se encarga de actualizar el título */}
            <TitleUpdater />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/edit-profile" element={<ProfileEdit />} />
                <Route path="/edit-password" element={<EditPassword />} />
                <Route path="/edit-profile-name" element={<EditProfileName />} />
            </Routes>
        </Router>
    );
}

export default App;