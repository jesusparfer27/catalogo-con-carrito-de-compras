// Album.js
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumContext } from '../Layout'; // Asegúrate de que el path es correcto

const Album = () => {
  const { productoId } = useParams();
  const { albums } = useContext(AlbumContext);

  const album = albums.find(album => album.id === parseInt(productoId, 10));

  if (!album) return <p>Album not found</p>;    

  console.log(albums)

  return (
    <article>
      <h1>Estoy en vista de un Producto: {productoId}</h1>
      <div className="albumContainer">
        <div className="albumBackground">
          <div className="albumInformation">
            <h2>{album.name}</h2>
            <p>{album.name_artist}</p>
            <p>{album.album_date}</p>
            <p>{album.genre}</p>
          </div>
        </div>
        <div className="albumSongsContainer">
          {album.songs && album.songs.length > 0 ? (
            album.songs.map(song => (
              <div key={song.id} className="albumSong">
                <h3>{song.name}</h3>
                <p>Likes: {song.likes}</p>
                <p>Times Played: {song.times_played}</p>
              </div>
            ))
          ) : (
            <p>No songs available for this album</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default Album;
