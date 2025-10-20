import "./Home.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";



export default function Home() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    function toggleMenu() {
        setMenuOpen((prev) => !prev);
    }

    function goToProfile() {
        navigate("/edit-profile");
        setMenuOpen(false); 
    }


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
                    <User2 className="user-icon" onClick={toggleMenu} />

                    {menuOpen && (
                        <div className="user-dropdown">
                        <button onClick={goToProfile}>Editar perfil</button>
                        <button>Mis Peliculas</button>
                        <button>Cerrar sesión</button>
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