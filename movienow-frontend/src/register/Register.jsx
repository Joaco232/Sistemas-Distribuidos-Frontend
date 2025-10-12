
import "./Register.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import ContainerGlass from "../components/ContainerGlass.jsx";
import InputField from "../components/InputField.jsx";
import Header from "../components/Header.jsx";
import ButtonGlass from "../components/ButtonGlass.jsx";
import Footer from "../components/Footer.jsx";


export default function Register() {

    return (

        <div className="register-page">

            <Header className="register-header">

                <img className="logo-header" src={LogoB} alt="MovieNow logo"/>

                <button className="sign-in-button">Iniciar sesión</button>

            </Header>

            <div className="register-body">

                <ContainerGlass className="form-container">

                    <p className="register-title">Cree su cuenta</p>

                    <img className="logo-form" src={Imagotipo} alt="MovieNow logo"/>

                    <p className="register-slogan">Ninguna película se nos escapa.</p>

                    <form className="register-form">

                        <InputField label="Nombre" name="nombre" className="text-input" />
                        <InputField label="Apellido" name="apellido" className="text-input" />
                        <InputField label="Email" type="email" name="email" className="text-input"/>
                        <InputField label="Contraseña" type="password" name="password" className="text-input" />
                        <InputField label="Repetir Contraseña" type="password" name="confirmPassword" className="text-input"/>

                        <ButtonGlass type="submit" className="form-button" >Registrarse</ButtonGlass>
                    </form>

                </ContainerGlass>

            </div>

            <Footer className="register-footer"></Footer>

        </div>
    );
}