import "./Home.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../services/apiUser.js";



export default function Home() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);

    function goToLogin() {
        navigate("/login");
        setMenuOpen(false); 
    }

     function goToProfile() {
        navigate("/edit-profile");
        setMenuOpen(false); 
    }

    function toggleMenu() {
        setMenuOpen((prev) => !prev);
    }

    function goToProfile() {
        navigate("/edit-profile");
        setMenuOpen(false); 
    }

    useEffect(() => {
    getCurrentUser()
        .then(setUser)
        .catch(err => console.error(err));
    }, []);



    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="home-page">

            <Header className="register-header">

                <img className="logo-header-home" src={LogoB} alt="MovieNow logo"/>

                <div className="user-menu-container" ref={menuRef}>
                    <span className="user-display-name">{user ? user.name : "Invitado"}</span>
                    <User2 className="user-icon" onClick={toggleMenu} />
                    

                    {menuOpen && (
                        <div className="user-dropdown">
                        {user ? (
                            <>
                            <button onClick={goToProfile}>Editar perfil</button>
                            <button>Mis Películas</button>
                            <button>Cerrar sesión</button>
                            </>
                        ) : (
                            <button onClick={goToLogin}>Iniciar sesión</button>
                        )}
                        </div>
                )}
                </div>


            </Header>

            <div className="home-body" >

            </div>



            <Footer className="home-footer"></Footer>

        </div>
    );
}