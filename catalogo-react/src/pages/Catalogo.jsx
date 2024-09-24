import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModoOscuroContext } from '../Layout';
import { AlbumContext } from '../Layout';

const Catalogo = () => {
    const { tema, setTema, nombre, setNombre } = useContext(ModoOscuroContext);
    const { albums, setAlbums } = useContext(AlbumContext);
    const [albumsPerPage, setAlbumsPerPage] = useState(12); // Mostrar 12 álbumes por página (6 por fila)
    const [albumsFilter, setAlbumsFilter] = useState([]);
    const [filter, setFilter] = useState("");
    const [buttonFilterGenre, setButtonFilterGenre] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getAlbums("/public/backend/API/v1/lib.json");
    }, []);

    const getAlbums = async (url) => {
        try {
            const respuesta = await fetch(url);
            const objeto = await respuesta.json();
            setAlbums(objeto.albums);
            setAlbumsFilter(objeto.albums);
        } catch (error) {
            console.error("Error al cargar los álbumes: ", error);
        }
    };

    const handleFilterByArtistName = (e) => {
        const string = e.target.value;
        setFilter(string);

        if (string.trim().length > 3) {
            const filtered = albums.filter(album => album.name_artist.toLowerCase().includes(string.trim().toLowerCase()));
            setAlbumsFilter(filtered);
        } else {
            setAlbumsFilter(albums);
        }
        setCurrentPage(1);
    };

    const handleFilterByGenreButton = (genre) => {
        setButtonFilterGenre(genre);
        if (genre === "All") {
            setAlbumsFilter(albums);
        } else {
            const filtered = albums.filter(album => album.genre.toLowerCase() === genre.toLowerCase());
            setAlbumsFilter(filtered);
        }
        setCurrentPage(1);
    };

    const pageNumbers = [];
    const totalProducts = albumsFilter.length;
    const totalPages = Math.ceil(totalProducts / albumsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const onPreviusPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const onSpecificPage = (n) => {
        setCurrentPage(n);
    };

    const startIndex = (currentPage - 1) * albumsPerPage;
    const currentAlbums = albumsFilter.slice(startIndex, startIndex + albumsPerPage);

    return (
        <AlbumContext.Provider value={{ albums }}>
            <article className='articleContainer'>
                <section className='catalogContainer'>
                    <div className="filterBlock">
                        <div className="buttonBlock">
                            <button className={`${buttonFilterGenre === "All" ? "btnA" : ""}`}
                                onClick={() => handleFilterByGenreButton("All")}
                            >
                                All
                            </button>
                            <button className={`${buttonFilterGenre === "Trap" ? "btnB" : ""}`}
                                onClick={() => handleFilterByGenreButton("Trap")}
                            >
                                Trap
                            </button>
                            <button className={`${buttonFilterGenre === "Latin Pop" ? "btnC" : ""}`}
                                onClick={() => handleFilterByGenreButton("Latin Pop")}
                            >
                                Latin Pop
                            </button>
                            <button className={`${buttonFilterGenre === "Hip-Hop" ? "btnD" : ""}`}
                                onClick={() => handleFilterByGenreButton("Hip-Hop")}
                            >
                                Hip-Hop
                            </button>
                            <button className={`${buttonFilterGenre === "Reggaeton" ? "btnE" : ""}`}
                                onClick={() => handleFilterByGenreButton("Reggaeton")}
                            >
                                Reggaeton
                            </button>
                        </div>
                        <div className="searchbarBlock">
                            <input type="text"
                                onChange={handleFilterByArtistName}
                                placeholder='¿A quien te gustaría escuchar? (4 chars)'
                                style={{ width: "400px", height: "2rem", borderRadius: ".6rem", border: "1px solid black", color: "white" }}
                                value={filter}
                            />
                            {filter}
                            <button className='x' onClick={() => setFilter("")}>x</button>
                        </div>
                    </div>

                    {/* Sección de Últimas Tendencias */}
                    <div className="sectionTitle">Últimas Tendencias</div>
                    <div className="albumCatalog">
                        {
                            currentAlbums.slice(0, 6).map((album) => <AlbumCard key={album.id} {...album} />) // Solo muestra los primeros 6 álbumes
                        }
                    </div>

                    {/* Sección de Nuevos Álbumes */}
                    <div className="sectionTitle">Nuevos Álbumes</div>
                    <div className="albumCatalog">
                        {
                            currentAlbums.slice(6, 12).map((album) => <AlbumCard key={album.id} {...album} />) // Muestra los siguientes 6 álbumes
                        }
                    </div>
                </section>

                {/* Paginación */}
                <nav className="pagination">
                    <a className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''} black-text`} onClick={onPreviusPage}>Anterior</a>
                    <ul className="pagination-list">
                        {
                            pageNumbers.map(noPage => (
                                <li key={noPage}>
                                    <a className={`pagination-link ${noPage === currentPage ? 'is-current' : ''} black-text`}
                                        onClick={() => onSpecificPage(noPage)}
                                    >
                                        {noPage}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                    <a className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''} black-text`} onClick={onNextPage}>Siguiente</a>
                </nav>
            </article>
        </AlbumContext.Provider>
    );
};

const AlbumCard = ({ id, image, name, name_artist, album_date, times_played, likes, genre }) => {
    return (
        <Link to={{
            pathname: `/producto/${id}`,
            state: { id, name, image, name_artist, times_played, likes }
        }} className="no-underline">
            <div className='cardAlbum' key={id}>
                <div className="imageContainer">
                    <img src={image} alt="" />
                    <span className="material-symbols-outlined favorite-icon">favorite</span>
                </div>
                <strong>{name}</strong>
                <p>{name_artist}</p>
            </div>
        </Link>
    );
};

export default Catalogo;
