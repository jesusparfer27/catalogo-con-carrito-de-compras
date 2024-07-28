import { createBrowserRouter } from "react-router-dom";

// importar páginas

// imporar páginas especiales

import Home from '../pages/Home'
import Catalogo from "../pages/Catalogo";
import Album from "../pages/Album";

// importar páginas especiales
import Layout from '../Layout'
import ErrorPage from "../error-page";

const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: 'catalogo',
            element: <Catalogo/>
        },
        {
            path: 'producto/:productoId',
            element: <Album/>
        },
        {
            path: '*',
            element: <ErrorPage/>
        },
    ]
}]);

export default router;