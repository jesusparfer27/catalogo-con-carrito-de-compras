import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()
    console.log(error)

    return (<div>
        Oops, tuvimos un error
        <p>
            {error ?.statusText || error?.message || "Página no encontrada"}
        </p>
    </div>
    );
}

export default ErrorPage;