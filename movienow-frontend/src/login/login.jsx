import { loginUser } from "../services/apiUser.js";
import "./login.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import ContainerGlass from "../components/ContainerGlass.jsx";
import InputField from "../components/InputField.jsx";
import Header from "../components/Header.jsx";
import ButtonGlass from "../components/ButtonGlass.jsx";
import Footer from "../components/Footer.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
;

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    function goToRegister() {
        navigate("/signup");
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (Object.values(formData).some(value => String(value).trim() === "")) {

            setError("Por favor, complete todos los campos.");
            return;
        }
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError("Por favor, ingrese un email válido.");
            return;
        }
        if (formData.password.length < 8 && !formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{8,}$/)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }

        try {

            const response = await loginUser(formData);
            console.log("Usuario logueado:", response);
            setError("");

        } catch (error) {
            setError(error.message);
        }
    }


    return (

        <div className="login-page">

            <Header className="login-header">

                <img className="logo-header" src={LogoB} alt="MovieNow logo" />

                <button className="register-button" onClick={goToRegister}>Registrarse</button>

            </Header>

            <div className="login-body">

                <ContainerGlass className="form-container">

                    <p className="login-title">Iniciar sesión</p>

                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo" />

                    <p className="login-slogan">Donde ninguna película se nos escapa.</p>

                    <form className="login-form" onSubmit={handleSubmit}>

                        <InputField label="Email" name="email" className="text-input"
                                    value={formData.email} type="text" onChange={handleChange}
                                    maxLength={254}/>

                        <InputField label="Contraseña" name="password" className="text-input"
                                    value={formData.password} type="password" onChange={handleChange}
                                    maxLength={254}/>

                        {error && <p className="error-text">{error}</p>}

                        <ButtonGlass type="submit" className="form-button">Ingresar</ButtonGlass>

                    </form>

                </ContainerGlass>

            </div>

            <Footer className="login-footer"></Footer>

        </div>
    );
}






