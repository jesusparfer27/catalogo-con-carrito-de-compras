// Hooks
import { useUser } from '../hooks/useUser'

const PrivateRoute = () => {

    const { user } = useUser()

    return user ? children
        : <>
            <p className="text-red-500">No tienes permiso para esta ruta</p>
        </>
}

export default PrivateRoute;