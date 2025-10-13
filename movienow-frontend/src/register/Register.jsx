
import "./Register.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import ContainerGlass from "../components/ContainerGlass.jsx";
import InputField from "../components/InputField.jsx";
import Header from "../components/Header.jsx";
import ButtonGlass from "../components/ButtonGlass.jsx";
import Footer from "../components/Footer.jsx";
import {useState} from "react";
import {registerUser} from "../services/apiUser.js";


export default function Register() {

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        email: "",
        password1: "",
        password2: ""
    });

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

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (Object.values(formData).some(value => value.trim() === "")) {

            setError("Por favor, complete todos los campos.");
            return;
        }
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError("Por favor, ingrese un email válido.");
            return;
        }
        if (formData.password1.length < 8 && !formData.password1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{8,}$/)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }
        if (formData.password1 !== formData.password2) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {

            let userData = {
                name: formData.name,
                birthDate: formData.birthDate,
                email: formData.email,
                password: formData.password1
            };
            const response = await registerUser(userData);
            console.log("Usuario registrado:", response);
            setError("");

        } catch (error) {

            setError(error.message);
        }
    }


    return (

        <div className="register-page">

            <Header className="register-header">

                <img className="logo-header" src={LogoB} alt="MovieNow logo"/>

                <button className="sign-in-button">Iniciar sesión</button>

            </Header>

            <div className="register-body" onSubmit={handleSubmit}>

                <ContainerGlass className="form-container">

                    <p className="register-title">Cree su cuenta</p>

                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo"/>

                    <p className="register-slogan">Ninguna película se nos escapa.</p>

                    <form className="register-form">

                        <InputField label="Nombre Completo" name="name" className="text-input"
                                    value={formData.name} type={"text"} onChange={handleChange}
                                    maxLength={50}/>

                        <InputField label="Fecha de Nacimiento" name="birthDate" className="text-input "
                                    value={formData.birthDate} type={"date"} onChange={handleChange} datepicker max={today}/>

                        <InputField label="Email" type="text" name="email" className="text-input"
                                    value={formData.email} onChange={handleChange}
                                    maxLength={254}/>

                        <InputField label="Contraseña" type="password" name="password1" className="text-input"
                                    value={formData.password1} onChange={handleChange}
                                    maxLength={254}/>

                        <InputField label="Repetir Contraseña" type="password" name="password2" className="text-input"
                                    value={formData.password2} onChange={handleChange}
                                    maxLength={254}/>

                        {error && <p className="error-text">{error}</p>}

                        <ButtonGlass type="submit" className="form-button" >Registrarse</ButtonGlass>

                    </form>

                </ContainerGlass>

            </div>

            <Footer className="register-footer"></Footer>

        </div>
    );
}