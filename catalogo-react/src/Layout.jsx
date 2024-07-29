import { Outlet, NavLink, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { createContext, useState } from 'react'
import './css/home.css'
import './css/catalogo.css'

export const ModoOscuroContext = createContext("light")


const Layout = () => {
    const [tema, setTema] = useState("light")

    const [nombre, setNombre] = useState("jesus")

    return (
        <ModoOscuroContext.Provider value={{tema, setTema, nombre}}>
    <>
    <Header />
        <div>
            <main className='mainContainer'>
                <Outlet />
            </main>
        </div>
    <Footer />
    <button onClick={() => {
        setTema(tema == "dark" ? "light": "dark");
    }}>Cambiar tema: {tema}</button>
    </>
    </ModoOscuroContext.Provider>
    );
}

export default Layout;