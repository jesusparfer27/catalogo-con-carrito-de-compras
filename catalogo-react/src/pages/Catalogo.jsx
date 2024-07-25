import { useState, useEffect } from 'react'


const Catalogo = () => {

    const [errorData, setErrorData] = useState("")
    const [albumsPerPage, setAlbumsPerPage] = useState(8)
    const [albums, setAlbums] = useState([])
    const [filter, setFilter] = useState("")
    const [buttonFilterGenre, setButtonFilterGenre] = useState("All")
    const [info, setInfo] = useState({
        count: 0,
        page: 0
    })

    useEffect(() => {
        getAlbums("./")
    }, [])

    const getAlbums = async (url) => {
        const respuesta = await fetch(url)
        const objeto = await respuesta.json()

        if (objeto.error) {
            setErrorData("No hay resultados")
            setAlbums([])
            setInfo({})
            return;
        } else {
            setErrorData("")
            setAlbums(objeto.results)
            setInfo(objeto.info)
        }

    }

    const handleFilterByName = (e) => {
        const string = e.target.value;
        setFilter(string);
        console.log(string)
        if (string.trim().length > 3) {
            getAlbums(`/catalogo-react/public/lib.json/?name=${string.trim()}`)
        }
    }

    const handleFilterByGenre = (e) => {
        const string = e.target.value;
        setFilter(string)
        console.log(string)
        if (string.trim().length > 3) {
            getAlbums(`/catalogo-react/public/lib.json/?genre=${string.trim()}`)
        }
    }

    const handleCombinedFilter = (e) => {
        const string = e.target.value;
        setValue(string);


        handleFilterByGenre(string);
        handleFilterByName(string);
    };

    const handleFilterByGenreButton = (genre) => {
        setButtonFilterGenre(genre)
        if (genre === "All") {
            getAlbums("/catalogo-react/public/lib.json")
        } else {
            getAlbums(`/catalogo-react/public/lib.json/?genre=${genre}`)
        }
    }

    const filteredAlbums = buttonFilter === "All"
        ? albums
        : albums.filter(album => album.genre.toLowerCase() === buttonFilter.toLowerCase())


    return (
        <main>
            <section className='catalogContainer'>
                <div className="filterBlock">
                    <div className="buttonBlock">
                        <button className={`${buttonFilterGenre == "Pop" ? "btnA" : ""}`} onClick={() => handleFilterByGenre("Pop")}>Pop</button>
                        <button className={`${buttonFilterGenre == "Rock" ? "btnA" : ""}`} onClick={() => handleFilterByGenre("Pop")}>Pop</button>
                        <button className={`${buttonFilterGenre == "Latin" ? "btnA" : ""}`} onClick={() => handleFilterByGenre("Pop")}>Pop</button>
                        <button className={`${buttonFilterGenre == "Hip-Hop" ? "btnA" : ""}`} onClick={() => handleFilterByGenre("Pop")}>Pop</button>
                    </div>
                    <div className="searchbarBlock">
                        <input type="text"
                            onChange={handleCombinedFilter}
                            placeholder='¿Que te gustaría escuchar? (4 chars)'
                            style={{ width: "400px" }}
                            value={filter}
                        />
                        {filter}

                        <button className='x' style={{}} onClick={
                            () => {
                                setFilter("")
                                getAlbums("/catalogo-react/public/lib.json")
                            }
                        }>x</button>
                    </div>
                </div>

                <div className="albumCatalog">
                    {errorData && <div>{errorData}</div>}
                    {
                        albums.map((albums, index) => <AlbumCard key={album.id} {...album} index={index} />
                        );
                        }
                </div>
            </section>
        </main>
    );
}

const AlbumCard = ({ image, name, name_artist, album_date, times_played, likes, genre}) => {
    return (
        <article className="Card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{nameArtist}</p>
            <p>{albumDate}</p>
            <p>{timesPlayed}</p>
            <p>{likes}</p>
            <p>{genre}</p>
        </article>
    )
}



export default Catalogo;