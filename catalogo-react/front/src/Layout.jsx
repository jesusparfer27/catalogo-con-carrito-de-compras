import { Outlet, NavLink, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { createContext, useState } from 'react'
import './css/index.css'
import './css/home.css'
import './css/catalogo.css'

export const ModoOscuroContext = createContext()
export const AlbumContext = createContext()

const Layout = () => {
    const [tema, setTema] = useState("light")
    const [albums, setAlbums] = useState([])
    const [nombre, setNombre] = useState("jesus")

    

    return (
        <AlbumContext.Provider value={{albums, setAlbums}}>
        <ModoOscuroContext.Provider value={{ tema, setTema, nombre, setNombre }}>
            <>
                <Header />
                <div className='allContent'>
                    <main className='allMainContent'>
                        <Outlet />
                    </main>
                </div>
                <Footer />
                {/* <button onClick={() => {
                    setTema(tema == "dark" ? "light" : "dark");
                }}>Cambiar tema: {tema}</button> */}
            </>
        </ModoOscuroContext.Provider>
        </AlbumContext.Provider>
    );
}

export default Layout;