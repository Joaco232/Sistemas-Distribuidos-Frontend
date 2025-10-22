import { useState } from "react";
import "./editProfileName.css";
import Header from "../components/Header/Header";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField/InputField";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass";   

export default function EditProfileName() {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        newName: "",
    });

    function goBackHome() {
        navigate("/home");
    }   

    function goBackEditProfile() { 
        navigate("/edit-profile");
    }

    function goBackHome() {
        navigate("/home");
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "name" && !/^[\p{L}\s]*$/u.test(value)) {
            return;
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmitChangeName(e) {

        e.preventDefault();

        if (Object.values(formData).some(value => String(value).trim() === "")) {

            setError("Por favor, ingrese un nuevo nombre.");
            return;
        }

        try {
            const response = await changeName(formData);
            console.log("Nombre cambiado:", response);
            setError("");
            goBackEditProfile();
        } catch (error) {
            console.error(error);
            setError(error.message || "Error al cambiar el nombre");
        }
    }  

    return (
        <div className="edit-name-page">
            <Header className="edit-name-header">
                <img
                    className="logo-header-edit-name"
                    src={LogoB}
                    alt="MovieNow logo"
                    onClick={goBackHome}
                />
                <button className="back-button" onClick={goBackEditProfile}>
                    Volver
                </button>
            </Header>

            <div className="edit-name-body">
                <ContainerGlass className="edit-name-container">
                    <p className="edit-name-title">Cambia tu Nombre</p>

                    <form className="edit-name-form" onSubmit={handleSubmitChangeName}>
                        <InputField label="Nuevo Nombre" name="newName" className="text-input"
                        value={formData.newName} type={"text"} onChange={handleChange} maxLength={50}/>
                        

                        {error && <p className="error-message">{error}</p>}

                        <ButtonGlass type="submit" className="submit-button">
                            Aplicar
                        </ButtonGlass>
                    </form>
                </ContainerGlass>
            </div>
        </div>
    );
}



