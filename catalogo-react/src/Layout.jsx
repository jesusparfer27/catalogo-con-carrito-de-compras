import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './css/catalogo.css'

const Layout = () => {
    return (
    <>
    <Header />
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    <Footer />
    </>
    );
}

export default Layout;