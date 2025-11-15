import LogoB from "../assets/images/movienow-logo-w-m.png";
import Imagotipo from "../assets/images/movienow-logo-w.png";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../services/apiUser.js";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import "./Home.css";
import {fetchMoviesByName} from "../services/apiMovie.js";
import MovieCard from "../components/MovieCard/MovieCard.jsx";
import ButtonGlass from "../components/ButtonGlass/ButtonGlass.jsx";
import ArrowLeft from "../assets/images/arrowpng.png";
import ArrowRight from "../assets/images/arrowpng2.png";


export default function Home() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [nameSearch, setNameSearch] = useState("");

    function goToLogin() {
        navigate("/login");
        setMenuOpen(false); 
    }

    function toggleMenu() {
        setMenuOpen((prev) => !prev);
    }

    function goToProfile() {
        navigate("/edit-profile");
        setMenuOpen(false); 
    }

    function logout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
        setMenuOpen(false);
    }

    useEffect(() => {
    getCurrentUser()
        .then(setUser)
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    const [movies, setMovies] = useState([]);

    async function handleSearch(name) {
        try {
            const data = await fetchMoviesByName(name);
            setMovies(data.results || []);
            setTotalPages(data.total_pages)
            setPage(data.page)
            setNameSearch(name)


        } catch (error) {
            console.error("Error buscando películas:", error);
        }
    }

    async function goToNextPage() {
        if (page < totalPages) {
            const data = await fetchMoviesByName(nameSearch, page + 1);
            setMovies(data.results || []);
            setPage(data.page);
            setTotalPages(data.total_pages);
        }
    }

    async function goToPreviousPage() {
        if (page > 1) {
            const data = await fetchMoviesByName(nameSearch, page - 1);
            setMovies(data.results || []);
            setPage(data.page);
            setTotalPages(data.total_pages);
        }
    }


    return (
        <div className="home-page">

            <Header className="register-header">

                <img className="logo-header-home" src={LogoB} alt="MovieNow logo"/>

                <div className="user-menu-container" ref={menuRef}>
                    <span className="user-display-name">{user ? user.name : "Invitado"}</span>
                    <User2 className="user-icon" onClick={toggleMenu} />
                    

                    {menuOpen && (
                        <div className="user-dropdown">
                        {user ? (
                            <>
                            <button onClick={goToProfile}>Editar perfil</button>
                            <button onClick={logout}>Cerrar sesión</button>
                            </>
                        ) : (
                            <button onClick={goToLogin}>Iniciar sesión</button>
                        )}
                        </div>
                )}
                </div>

            </Header>

            <div className="home-body">

                <div className="home-search-bar-div">

                    <img className="logo-body-home" src={Imagotipo} alt="MovieNow logo"/>
                    <SearchBar className="search-bar-home" placeholder="Buscar película..." onSearch={handleSearch} />

                    <div className="home-search-results-div">
                        {movies
                            .filter((movie) => movie.backdrop_path)
                            .map((movie) => (
                                <MovieCard className={"home-card"}
                                           key={movie.id}
                                           title={movie.title}
                                           backdrop_path={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                           overview={movie.overview}
                                           realease_date={movie.release_date}
                                           adult={movie.adult}
                                           original_language={movie.original_language}
                                           id={movie.id}
                                           original_title={movie.original_title}
                                           genre={movie.genres}
                                           platforms={movie.platforms}
                                />
                            ))}
                    </div>

                    <div className="next-page-buttons">
                        <ButtonGlass
                            className="page-btn"
                            onClick={goToPreviousPage}
                            disabled={page === 1}
                        >
                            <img src={ArrowLeft} alt="Arrow left round" />
                        </ButtonGlass>

                        <span className="page-info">Página {page} de {totalPages}</span>

                        <ButtonGlass
                            className="page-btn"
                            onClick={goToNextPage}
                            disabled={page === totalPages}
                            round
                        >
                            <img src={ArrowRight} alt="Arrow right" className={"arrow-img"} />
                        </ButtonGlass>
                    </div>

                </div>

            </div>



            <Footer className="home-footer"></Footer>

        </div>
    );
}