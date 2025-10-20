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

                <div className="home-search">

                    <div className="home-search-logo">


                    </div>

                    <div className="home-search-bar">

                    </div>


                    <div className="home-search-results">

                    </div>

                </div>

                <div className="home-recommendations">

                    <div className="home-recommendations-top">

                    </div>

                    <div className="home-recommendations-personalized">

                    </div>
                    
                </div>


            </div>

            <Footer className="home-footer">

            </Footer>

        </div>
    );
}