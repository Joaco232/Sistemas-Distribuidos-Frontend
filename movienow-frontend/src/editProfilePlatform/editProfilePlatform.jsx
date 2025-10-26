import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUserPlatforms, platforms } from "../services/platformService";
import React from "react";



export function EditProfilePlatform() {
  
    const navigate = useNavigate();

    const [error, setError] = useState("");
  
    const [loading, setLoading] = useState(false);
  
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const [platforms, setPlatforms] = useState([]); //meto las platafromas a mano para probar, despues se saca y conectamos con back


    useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPlatforms([
        { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Disney+", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
        { name: "HBO Max", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg" },
        { name: "Amazon Prime", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png" },
      ]);
      setLoading(false);
    }, 1000);
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

  function goToHome() {
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
    <div style={{
        backgroundColor: "#222",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
        margin: "20px",
    }}>
        <h2>Plataformas cargadas desde el backend</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading && <p>Cargando plataformas...</p>}

        {!loading && platforms.length === 0 && (
        <p>No se encontraron plataformas.</p>
        )}

        <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginTop: "10px"
        }}>
        {platforms.map((p) => (
            <div
            key={p.name}
            style={{
                backgroundColor: "#333",
                border: "1px solid #555",
                padding: "10px",
                borderRadius: "6px",
                minWidth: "120px",
                textAlign: "center"
            }}
            >
            <img
                src={p.logo}
                alt={p.name}
                style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                marginBottom: "6px"
                }}
            />
            <p>{p.name}</p>
            </div>
        ))}
        </div>
    </div>
    );
}
