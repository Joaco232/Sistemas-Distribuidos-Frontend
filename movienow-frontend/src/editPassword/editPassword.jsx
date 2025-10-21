import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass.jsx";
import Footer from "../components/Footer/Footer.jsx";
import InputField from "../components/InputField/InputField.jsx";
import { useState } from "react";
import "./editPassword.css";
import { changePassword } from "../services/apiUser.js";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass.jsx";

export default function EditPassword() {
    
    const navegate = useNavigate();
    const [error, setError] = useState("");

    function goBackHome() {
        navegate("/home");
    }

        function goBackEditProfile() {
        navegate("/edit-profile");
    }

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmitChangePassword(e) {

        e.preventDefault();
        
        if (Object.values(formData).some(value => String(value).trim() === "")) {

            setError("Por favor, complete todos los campos.");
            return;
        }

        try {

            const response = await changePassword(formData);
            console.log("Contraseña cambiada:", response);
            setError("");
            goBackEditProfile();

        } catch (error) {
            console.error(error);
            setError(error.message || "Error al cambiar la contraseña");
        }


    
    }




    return (
        <div className="edit-password-page">
            <Header className="edit-password-header">
                <img
                    className="logo-header-edit-password"
                    src={LogoB}
                    alt="MovieNow logo"
                    onClick={goBackHome}
                />
                <button className="back-button" onClick={goBackEditProfile}>
                    Volver
                </button>
            </Header>

            <div className="edit-password-body">
                <ContainerGlass className="edit-password-container">
                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo"/>
                    <p className="edit-password-slogan">Cambio de contraseña</p>

                    <form className="edit-password-form" onSubmit={handleSubmitChangePassword}>
                        <InputField label="Current Password" name="currentPassword" className="text-input"
                                    value={formData.currentPassword} type="password" onChange={handleChange}
                                    maxLength={254}/>

                        <InputField label="New Password" name="newPassword" className="text-input"
                                    value={formData.newPassword} type="password" onChange={handleChange}
                                    maxLength={254}/>

                        {error && <p className="error-text">{error}</p>}
                    
                        <ButtonGlass type="submit" className="submit-button">
                            Aplicar
                        </ButtonGlass>
                    </form>
                    
                </ContainerGlass>
            </div>

            {/*<Footer className="login-footer"></Footer> LO SACO PARECE QUEDAR MEJOR*/}
        
        </div>
    );

}