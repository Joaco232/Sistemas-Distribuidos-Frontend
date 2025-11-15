import {Container} from "lucide-react";
import ContainerGlass from "../ContainerGlass/ContainerGlass.jsx";
import "./MovieCard.css";

export default function MovieCard({ children, className = "",
                                      title,
                                      backdrop_path,
                                      overview,
                                      adult,
                                      realease_date,
                                      original_language,
                                      id,
                                      original_title,
                                      genre,
                                      platforms
                                  }) {



    return (
        <div className={`movie-card ${className}`}>
            <ContainerGlass className={"container-glass-cards"}>

                <div className={"card-col-1"}>
                    <img src={backdrop_path} alt={title} className="movie-backdrop" />
                </div>

                <div className={"card-col-2"}>
                    <h2 className="movie-title">{title}</h2>
                    <p className="">{realease_date}</p>
                    <p className="movie-overview">{overview}</p>
                </div>

                <div className={"card-col-3"}>
                    <h3>Disponible en:</h3>
                    <ul>
                        {platforms && platforms.length > 0 ? (
                            platforms.map((platform, index) => (
                                <li key={index}>{platform}</li>
                            ))
                        ) : (
                            <li>No disponible</li>
                        )}
                    </ul>
                </div>

            </ContainerGlass>
        </div>
    );
}