
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
import {
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateBirthDate,
    mapBackendErrors
} from "../services/validations.js";



export default function Register() {

    const today = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        email: "",
        password1: "",
        password2: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        birthDate: "",
        email: "",
        password1: "",
        password2: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function goToLogin() {
        navigate("/login");
    }

    function goToHome() {
        navigate("/home");
    }

    // Validación individual de campos usando las funciones de validations.js
    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return validateName(value);
            case "birthDate":
                return validateBirthDate(value);
            case "email":
                return validateEmail(value);
            case "password1":
                return validatePassword(value);
            case "password2":
                return validatePasswordMatch(formData.password1, value);
            default:
                return "";
        }
    };

    function handleChange(e) {
        const { name, value } = e.target;

        // Validación en tiempo real para el nombre
        if (name === "name" && value && !/^[\p{L}\s]*$/u.test(value)) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }

        // Limpiar error general
        if (error) {
            setError("");
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMsg = validateField(name, value);
        
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        // Validar todos los campos
        const newErrors = {
            name: validateField("name", formData.name),
            birthDate: validateField("birthDate", formData.birthDate),
            email: validateField("email", formData.email),
            password1: validateField("password1", formData.password1),
            password2: validateField("password2", formData.password2)
        };

        setErrors(newErrors);

        // Verificar si hay algún error
        const hasErrors = Object.values(newErrors).some(error => error !== "");
        
        if (hasErrors) {
            setError("Por favor, corrija los errores en el formulario.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const userData = {
                name: formData.name,
                birthDate: formData.birthDate,
                email: formData.email,
                password: formData.password1
            };

            const response = await registerUser(userData, 10000);

            console.log("Usuario registrado:", response);

            setLoading(false);

            setTimeout(() => navigate("/login"), 100);

        } catch (error) {
            setLoading(false);
            
            // Mapear errores del backend a campos específicos
            const backendErrors = mapBackendErrors(error.message);
            
            setErrors(prev => ({
                ...prev,
                name: backendErrors.name || prev.name,
                email: backendErrors.email || prev.email,
                password1: backendErrors.password || prev.password1,
                birthDate: backendErrors.birthDate || prev.birthDate
            }));
            
            setError(backendErrors.general);
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

                        <InputField 
                            label="Nombre" 
                            name="name" 
                            className="text-input"
                            value={formData.name} 
                            type={"text"} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={50}
                            error={errors.name}
                        />

                        <InputField 
                            label="Fecha de Nacimiento" 
                            name="birthDate" 
                            className="text-input"
                            value={formData.birthDate} 
                            type="date" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            max={today} 
                            placeholder=""
                            error={errors.birthDate}
                        />

                        <InputField 
                            label="Email" 
                            type="text" 
                            name="email" 
                            className="text-input"
                            value={formData.email} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={254}
                            error={errors.email}
                        />

                        <InputField 
                            label="Contraseña" 
                            type="password" 
                            name="password1" 
                            className="text-input"
                            value={formData.password1} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={254}
                            error={errors.password1}
                        />

                        <InputField 
                            label="Repetir Contraseña" 
                            type="password" 
                            name="password2" 
                            className="text-input"
                            value={formData.password2} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={254}
                            error={errors.password2}
                        />

                        {error && <p className="error-text">{error}</p>}

                        <ButtonGlass type="submit" className="form-button">Registrarse</ButtonGlass>

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