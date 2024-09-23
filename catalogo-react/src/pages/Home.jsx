// Home.js
import stylishImage from '../assets/stylish-modern-woman-headphones-listening-music-dancing-enjoying-favorite-songs-earphones-standing-against-blue-background.png';
import '../css/home.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import ModalLogin from '../components/ModalLogin';
import { useModal } from '../context/ModalContext';

import { useEffect } from 'react';

const Home = () => {

  const { isModalOpen } = useModal();

    useEffect(() => {
        $(document).ready(function () {
            var mouseX = 0, mouseY = 0;
            var traX = 0, traY = 0;

            if ($(".title").length) {
                $(document).mousemove(function (e) {
                    mouseX = e.pageX;
                    mouseY = e.pageY;
                    traX = (4 * mouseX) / 570 + 40;
                    traY = (4 * mouseY) / 570 + 50;
                    console.log("traX:", traX, "traY:", traY);
                    $(".background-wallpaper2, .Container, .title, .subtitle").css({ "background-position": traX + "%" + " " + traY + "%" });
                });
            } else {
                console.error("No se encontró ningún elemento con la clase 'title'.");
            }
        });
    }, []);

    return (
      <>
      {isModalOpen && <ModalLogin />}
        <body className="Container">
  <div className="background-wallpaper2"></div>
  <div className="homeFlex">
    <div className="imageContainer">
      <img className="ImageContent" src={stylishImage} alt="" />
    </div>
    <div className="homeFlexText">
      <div className="logoText">
        <div className="title">Musiko</div>
        <div className="subtitle">Tu viaje musical comienza aquí</div>
      </div>
      <div className="blockLink">
        <div className="BlockTextAndLink">
          <h1 className="h1Text">Explora Nuestra Colección de Álbumes Musicales</h1>
          <NavLink className="navLink" to="/Catalogo">Link Aqui</NavLink>
        </div>
      </div>
    </div>
  </div>
</body>
</>

    );
}

export default Home;
