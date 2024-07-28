import { useState, useEffect, useContext, createContext } from 'react'
import { Link } from 'react-router-dom'
import { ModoOscuroContext } from '../Layout'

export const AlbumContext = createContext()

const Catalogo = () => {

    const { tema, setTema, nombre } = useContext(ModoOscuroContext)

    const [albumsPerPage, setAlbumsPerPage] = useState(8)
    const [albumsFilter, setAlbumsFilter] = useState([])
    const [albums, setAlbums] = useState([])
    const [filter, setFilter] = useState("")
    const [buttonFilterGenre, setButtonFilterGenre] = useState("All")
    const [info, setInfo] = useState({
        count: 0,
        page: 0
    })

    useEffect(() => {
        getAlbums("/public/backend/API/v1/lib.json")
    }, [])

    const getAlbums = async (url) => {
        const respuesta = await fetch(url)
        const objeto = await respuesta.json()
        setAlbums(objeto.albums)
        setAlbumsFilter(objeto.albums)
    }

    const handleFilterByArtistName = (e) => {
        const string = e.target.value;
        setFilter(string);
        console.log(string)

        if (string.trim().length > 3) {
            const filtered = albums.filter(album => album.name_artist.toLowerCase().includes(string.trim().toLowerCase()));
            setAlbumsFilter(filtered)
        } else {
            setAlbumsFilter(albums)
        }
    }

    const handleFilterByGenreButton = (genre) => {
        setButtonFilterGenre(genre);
        if (genre === "All") {
            setAlbumsFilter(albums)
        } else {
            const filtered = albums.filter(albums => albums.genre.toLowerCase() === genre.toLowerCase())
            setAlbumsFilter(filtered)
        }
    }




    return (
        <AlbumContext.Provider value={{albums}}>
        <main>
            <h1>catalogo ({tema} - {nombre})</h1>
            <section className='catalogContainer'>
                <div className="filterBlock">
                    <div className="buttonBlock">
                        <button className={`${buttonFilterGenre == "All" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("All")}>All</button>
                        <button className={`${buttonFilterGenre == "Trap" ? "btnB" : ""}`} onClick={() => handleFilterByGenreButton("Trap")}>Trap</button>
                        <button className={`${buttonFilterGenre == "Latin Pop" ? "btnC" : ""}`} onClick={() => handleFilterByGenreButton("Latin Pop")}>Latin Pop</button>
                        <button className={`${buttonFilterGenre == "Hip-Hop" ? "btnD" : ""}`} onClick={() => handleFilterByGenreButton("Hip-Hop")}>Hip-Hop</button>
                        <button className={`${buttonFilterGenre == "Reggaeton" ? "btnE" : ""}`} onClick={() => handleFilterByGenreButton("Reggaeton")}>Reggaeton</button>

                    </div>
                    <div className="searchbarBlock">
                        <input type="text"

                            onChange={handleFilterByArtistName}
                            placeholder='¿A quien te gustaría escuchar? (4 chars)'
                            style={{ width: "400px", height: "2rem", borderRadius: ".6rem", border: "1px solid black" }}
                            value={filter}

                        />
                        {filter}

                        <button className='x' style={{}} onClick={
                            () => {
                                setFilter("")
                                getAlbums("/lib.json")
                            }
                        }>x</button>
                    </div>
                </div>

                <div className="albumCatalog">
                    {
                        albumsFilter.map((album, index) => <AlbumCard key={album.id} {...album} index={index} />
                        )
                    }
                </div>
            </section>
        </main>
        </AlbumContext.Provider>
    );
}

const AlbumCard = ({id, image, name, name_artist, album_date, times_played, likes, genre }) => {
    return (
        <Link to={{
            pathname: `/producto/${id}`,
            state: { id, name, image, name_artist, times_played, likes }
        }} className="no-underline">
            <article className="Card">
                <div className="part1Album">
                    <img className='catalogImage' src={image} alt={name} />
                </div>
                <h3 className='h3AlbumTitle'>{name}</h3>
                <strong className='strongStyle'>{name_artist}</strong>
                <div className='reactionsData'>
                    <p>{times_played}</p>
                    <p>{likes}</p>
                </div>
            </article>
        </Link>
    )
}



export default Catalogo;