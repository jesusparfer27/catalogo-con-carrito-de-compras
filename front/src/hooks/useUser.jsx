import { useState } from 'react' 
import { createContext, useContext, useState, useEffect } from 'react'

// crear un contexto de Usuario
const UserContext = createContext()

export function userProvider({children}) {

    const [user, setUser] = useState(null)

    // variables de entorno
    const {VITE_API_URL, VITE_API_BACKEND} = import.meta.env

    // ver si estoy loggeado
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    })

    // login
    const login = async (userData) => {
        console.log("estoy en el login");
        console.log(userData)

        // fetch para enviarle al login
        const response = await fetch (`${VITE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        // el backend me devuelve mi USUARIO completo 
        // foto, nombre, email (*NO CLAVE)
        const responseData = await response.json();

        if(!response.ok) {
            console.log("Error al traer los datos")
        }

        localStorage.setItem("user", JSON.stringify(responseData))

        // guardo con setUser mis datos de usuario
        setUser(responseData)
    }

    // registro
    const register = (userData) => {
        console.log("Estoy en register")
        setUser(userData)
    }

    // logout
    const logout = () => {
        console.log("Ejecutando logout");
        localStorage.removeItem("user");
        setUser(null)
    }

    return (
        <userContext.Provider value={{user, login, register, logout}}>
            {children}
        </userContext.Provider>
        );
}

export function useUser() {
    return useContext(UserContext)
}