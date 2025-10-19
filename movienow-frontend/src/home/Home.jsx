import "./Home.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";



export default function Home() {



    return (
        <div className="home-page">

            <Header className="register-header">

                <img className="logo-header-home" src={LogoB} alt="MovieNow logo"/>


            </Header>

            <div className="home-body" >

            </div>



            <Footer className="home-footer"></Footer>

        </div>
    );
}