import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import "./editProfilePlatform.css";
import LogoB from "../assets/images/movienow-logo-w-m.png";
import ContainerGlass from "../components/ContainerGlass/ContainerGlass";
import LoaderSpinner from "../components/LoaderSpinner/LoaderSpinner";
import PlatformBubble from "../components/ContainerLogo/containerLogo.jsx";
import { getAllDBPlatforms } from "../services/apiUser.js";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass.jsx";



export function EditProfilePlatform() {
  
    const navigate = useNavigate();

    const [error, setError] = useState("");
  
    const [loading, setLoading] = useState(false);
  
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const [platforms, setPlatforms] = useState([]); //meto las platafromas a mano para probar, despues se saca y conectamos con back


  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("jwt");
        const data = await getAllDBPlatforms(token);
        setPlatforms(data);

      } catch (err) {
        console.error("Error al cargar plataformas:", err);
        setError("No se pudieron cargar las plataformas.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);
    

  const togglePlatform = (name) => {
    setSelectedPlatforms((prev) => {
      const alreadySelected = prev.includes(name);

      if (alreadySelected) {
        const newList = prev.filter((p) => p !== name);
        return newList;
      } else {
        const newList = [...prev, name];
        return newList;
      }
    });
  };

  function goBackEditProfile() {
    navigate("/edit-profile");
  }

  function goBackHome() {
    navigate("/home");
  }



  async function handleSubmitChangePlatform(e) {
    e.preventDefault();

    if (selectedPlatforms.length === 0) {
      setError("Por favor, seleccione al menos una plataforma.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const dataToSend = { platforms: selectedPlatforms };

      const response = await changeUserPlatforms(dataToSend);
      console.log("Plataformas actualizadas:", response);

      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-platform-page">

      <Header className="edit-platform-header">
        <img
          className="logo-header-edit-platform"
          src={LogoB}
          alt="MovieNow logo"
          onClick={goBackHome}
        />
        <button className="back-button" onClick={goBackEditProfile}>
          Volver
        </button>
      </Header>

      <div className="edit-platform-container">

        <ContainerGlass className="edit-platform-glass">
          <p className="edit-platform-title">
            Seleccione Plataformas de Interes
          </p>
          
          {loading && (
            <div className="loading-overlay-platform">
                <div className="loader-container-platform">
                    <LoaderSpinner/>
                </div>
            </div>
          )}   

          {error && <p className="error-message">{error}</p>}
          {!loading && (
            <div className="every-container-logos">
              {platforms.map((p) => (
                <PlatformBubble
                  key={p.id}
                  name={p.name}
                  logo={p.logoUrl}
                  selected={selectedPlatforms.includes(p.name)}
                  onClick={() => togglePlatform(p.name)}
                />
              ))}
            </div>            
          )}
          
          <ButtonGlass type="submit" className="form-button-platform">
              Aplicar
          </ButtonGlass>

        </ContainerGlass>

      </div>    
    </div>
  );
}
