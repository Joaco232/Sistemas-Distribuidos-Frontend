import "./editProfile.css";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import { Pencil } from 'lucide-react';
import { Film } from "lucide-react";
import { User2 } from "lucide-react";
import { Star } from "lucide-react";
import { getCurrentUser } from "../services/apiUser.js";
import { useEffect } from "react";


export default function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  function goBack() {
    navigate("/home");
  }

  function handleEdit(field) {
    navigate(`/edit/${field}`);
  }

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="profile-page">
      <Header className="profile-header">
        <img
          className="logo-header"
          src={LogoB}
          alt="MovieNow logo"
          onClick={goBack}
        />
        <button className="back-button" onClick={goBack}>
          Volver
        </button>
      </Header>

      <div className="profile-body">
        <ContainerGlass className="profile-container">
          <img className="logo-form" src={Imagotipo} alt="MovieNow logo" />
          <p className="profile-slogan">Mejora tu experiencia MovieNow</p>

          <ul className="profile-list">
            <li onClick={() => handleEdit("name")}>
              <div className="Name">
                <span className="field-name">Nombre</span>
                <span className="field-value">{user?.name ?? "-"}</span>
              </div>
              <Pencil className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("password")}>
              <div className="Contra">
                <span className="field-name">Contraseña</span>
                <span className="field-value">********</span>
              </div>
              <Pencil className="edit-icon" />
            </li>
             <li onClick={() => handleEdit("foto")}>
              <div className="Foto">
                <span className="field-name">Foto de Perfil</span>
              </div>
              <User2 className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("plataforms")}>
              <div className="Plataformas">
                <span className="field-name">Plataformas</span>
              </div>
              <Film className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("Generos Favoritos")}>
              <div className="Generos Favoritos">
                <span className="field-name">Generos Favoritos</span>
              </div>
              <Star className="star-icon" />
            </li>
          </ul>
        </ContainerGlass>
      </div>

      <Footer />
    </div>
  );
}
