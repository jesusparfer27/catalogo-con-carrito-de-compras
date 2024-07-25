import { useState, useEffect, useContext } from 'react'
import { ModoOscuroContext } from '../Layout'


const Catalogo = () => {

    const {tema, setTema, nombre} = useContext(ModoOscuroContext)

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
        console.log(albums)
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
            getAlbums(`/lib.json`)
        }
    }

    const handleFilterByGenreButton = (genre) => {
        const albumGenre = (albums => albums.genre = 18)
        setAlbumsFilter()
    }

    const filteredAlbums = buttonFilterGenre === "All"
        ? albums
        : albums.filter(albums => albums.genre.toLowerCase() === buttonFilterGenre.toLowerCase())


    return (
        <main>
            <h1>catalogo ({tema} - {nombre})</h1>
            <section className='catalogContainer'>
                <div className="filterBlock">
                    <div className="buttonBlock">
                        <button className={`${filteredAlbums == "All" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("All")}>All</button>
                        <button className={`${filteredAlbums == "Rock" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("Rock")}>Rock</button>
                        <button className={`${filteredAlbums == "Latin" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("Latin")}>Latin</button>
                        <button className={`${filteredAlbums == "Hip-Hop" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("Hip-Hop")}>Hip-Hop</button>
                        <button className={`${filteredAlbums == "Pop" ? "btnA" : ""}`} onClick={() => handleFilterByGenreButton("Pop")}>Pop</button>

                    </div>
                    <div className="searchbarBlock">
                        <input type="text"

                            onChange={handleFilterByArtistName}
                            placeholder='¿Que te gustaría escuchar? (4 chars)'
                            style={{ width: "400px" }}
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
                        albums.map((album, index) => <AlbumCard key={album.id} {...album} index={index} />
                        )
                    }
                </div>
            </section>
        </main>
    );
}

const AlbumCard = ({ image, name, name_artist, album_date, times_played, likes, genre }) => {
    return (
        <article className="Card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{name_artist}</p>
            <p>{album_date}</p>
            <p>{times_played}</p>
            <p>{likes}</p>
            <p>{genre}</p>
        </article>
    )
}



export default Catalogo;