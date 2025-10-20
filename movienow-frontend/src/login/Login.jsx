import { loginUser } from "../services/apiUser.js";
import "./Login.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass.jsx";
import InputField from "../components/InputField/InputField.jsx";
import Header from "../components/Header/Header.jsx";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import RememberMeButton from "../components/RemeberMeButton/RememberMeButton.jsx"
;

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    function goToHome() {
        navigate("/home");
    }

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

    async function handleSubmitLogin(e) {

        e.preventDefault();

        if (Object.values(formData).some(value => String(value).trim() === "")) {

            setError("Por favor, complete todos los campos.");
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

                <img className="logo-header-login" src={LogoB} onClick={goToHome} alt="MovieNow logo" />

                <div className="register-line">
                    <span className="text-register-header">Eres nuevo en MovieNow?</span>
                    <button className="register-button" onClick={goToRegister}>
                        Registrarse
                    </button>
                </div>

            </Header>

            <div className="login-body">

                <ContainerGlass className="form-container-login">

                    <p className="login-title">Iniciar sesión</p>

                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo" />

                    <p className="login-slogan">Encuentra tu próxima película.</p>

                    <form className="login-form" onSubmit={handleSubmitLogin}>

                        <InputField label="Email" name="email" className="text-input"
                                    value={formData.email} type="text" onChange={handleChange}
                                    maxLength={254}/>

                        <InputField label="Contraseña" name="password" className="text-input"
                                    value={formData.password} type="password" onChange={handleChange}
                                    maxLength={254}/>

                    <div className="remember-section">

                        <RememberMeButton
                        checked={formData.rememberMe}
                        onChange={() =>
                            setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))
                        }
                        />

                        <p className="remember-label">Recordarme</p>
                    
                    </div>

                        {error && <p className="error-text">{error}</p>}

                        <ButtonGlass type="submit"  className="form-button-login">Ingresar</ButtonGlass>

                    </form>

                </ContainerGlass>

            </div>

            <Footer className="login-footer"></Footer>

        </div>
    );
}






