import "./editProfile.css";
import ContainerGlass from "../components/ContainerGlass.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import { Pencil } from 'lucide-react';
import { Film } from "lucide-react";
import { User2 } from "lucide-react";


export default function ProfileEdit() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    nombre: "Bautista Arruabarrena",
    email: "bautista@example.com",
    contraseña: "********",
    preferencias: "Acción, Ciencia Ficción",
  });

  function goBack() {
    navigate("/home");
  }

  function handleEdit(field) {
    navigate(`/edit/${field}`); // ejemplo: /edit/email
  }

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
          <p className="profile-title">Editar Perfil</p>
          <img className="logo-form" src={Imagotipo} alt="MovieNow logo" />
          <p className="profile-slogan">Personalizá tu experiencia MovieNow</p>

          <ul className="profile-list">
            <li onClick={() => handleEdit("name")}>
              <div className="Name">
                <span className="field-name">Nombre</span>
                <span className="field-value">{profileData.nombre}</span>
              </div>
              <Pencil className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("password")}>
              <div className="Contra">
                <span className="field-name">Contraseña</span>
                <span className="field-value">{profileData.contraseña}</span>
              </div>
              <Pencil className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("plataforms")}>
              <div className="Plataformas">
                <span className="field-name">Plataformas</span>
                <span className="field-value">{profileData.plataformas}</span>
              </div>
              <Film className="edit-icon" />
            </li>
            <li onClick={() => handleEdit("foto")}>
              <div className="Foto">
                <span className="field-name">Foto de Perfil</span>
                <span className="field-value">{profileData.Foto}</span>
              </div>
              <User2 className="edit-icon" />
            </li>
          </ul>
        </ContainerGlass>
      </div>

      <Footer />
    </div>
  );
}
