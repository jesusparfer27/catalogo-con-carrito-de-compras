import stylishImage from '../assets/stylish-modern-woman-headphones-listening-music-dancing-enjoying-favorite-songs-earphones-standing-against-blue-background.png';
import '../css/home.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <main className='HomeContainer'>
            <div className="blockImage">
                <img className='imgHome' src={stylishImage} alt="" />
            </div>
            <div className="iterativeBlock">
                <div className="tittleText">
                    <h1 className="tittleHome">Bienvenidos App!</h1>
                </div>
                <div className="descriptionText">

                </div>
            </div>
            <NavLink to={{
                pathname: `./Catalogo.jsx`

            }}>Link Aqui</NavLink>
        </main>
    );
}

export default Home;