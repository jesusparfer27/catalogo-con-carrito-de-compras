import '../css/header.css'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <header className="headerContainer">
            <div className='headerBlock'>
                <h3 className="h3Style">Subscribe now!!</h3>
            </div>
            <div className="iterativeHeader">
                <ul className="ulHeader">
                    <li className='liInput'>
                        <input type="text"
                        name=""
                        id=""
                        placeholder="Haz una busqueda (4 chars)"
                        />
                        <button className='searchBarHeader'>
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </li>
                    <li>
                        <NavLink className="NavLinkHeader" to="/">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink className="NavLinkHeader" to="/Catalogo">Explora</NavLink>
                    </li>
                    <li>
                        <NavLink className="NavLinkHeader" to="/producto/:productoId">Tendencias</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header
