import { useParams } from 'react-router-dom'


const Producto = () => {

    const { productoId } = useParams();


    return ( 
    <>
        <h1>Estoy en vista de un Producto: {productoId}</h1>
    </> 
    );
}
 
export default Producto;