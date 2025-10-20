
import "./Register.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass.jsx";
import InputField from "../components/InputField/InputField.jsx";
import Header from "../components/Header/Header.jsx";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {useState} from "react";
import {registerUser} from "../services/apiUser.js";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner/LoaderSpinner.jsx";



export default function Register() {
    

    const today = new Date().toISOString().split("T")[0];

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        email: "",
        password1: "",
        password2: ""
    });

    function goToLogin() {
        navigate("/login");
    }

    function goToHome() {
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

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const userData = {
                name: formData.name,
                birthDate: formData.birthDate,
                email: formData.email,
                password: formData.password1
            };

            const response = await registerUser(userData, 500);

            console.log("Usuario registrado:", response);

            setError("");

            setLoading(false);

            setTimeout(() => navigate("/login"), 100);


        } catch (error) {

            setError(error.message);
            setLoading(false);

        }
    }


    return (

        <div className="register-page">

            <Header className="register-header">

                <img className="logo-header-register" src={LogoB} onClick={goToHome} alt="MovieNow logo"/>

                <div className="login-line">
                    <span className="text-login-header">Ya tenés una cuenta?</span>
                    <button className="sign-in-button" onClick={goToLogin}>
                        Iniciar sesión
                    </button>
                </div>

            </Header>

            <div className="register-body">

                <ContainerGlass className="form-container">

                    <p className="register-title">Cree su cuenta</p>

                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo"/>

                    <p className="register-slogan">Ninguna película se nos escapa.</p>

                    <form className="register-form" onSubmit={handleSubmit}>

                        <InputField label="Nombre Completo" name="name" className="text-input"
                                    value={formData.name} type={"text"} onChange={handleChange}
                                    maxLength={50}/>

                        <InputField label="Fecha de Nacimiento" name="birthDate" className="text-input"
                                    value={formData.birthDate} type="date" onChange={handleChange}
                                    max={today} placeholder="" />

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

            {loading && (
                <div className="loading-overlay">
                    <div className="loader-container">
                        <LoaderSpinner/>
                    </div>
                </div>
            )}

        </div>
    );
}