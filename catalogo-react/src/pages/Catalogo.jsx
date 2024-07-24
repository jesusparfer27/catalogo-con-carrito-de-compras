import { useState, useEffect } from 'react'


const Catalogo = () => {

    const [albumsPerPage, setAlbumsPerPage] = useState(8)
    const [filter, setFilter] = useState("")
    const [info, setInfo] = useState({
        count: 0,
        page: 0
    })

    useEffect(() => {
        getAlbums("./")
    }, [])

    getAlbums = async (url) => {
        const respuesta = await fetch url(url)
        const objeto = respuesta.json
    } 


    return (
        <main>
            <section>

            </section>
        </main>
    );
}

export default Catalogo;