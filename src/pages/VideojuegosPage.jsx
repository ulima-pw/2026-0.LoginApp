import { useEffect, useState } from "react"
import Filtro from "../components/Filtro"
import GrillaVideojuegos from "../components/GrillaVideojuegos"
import Titulo from "../components/Titulo"
import params from "../params"
import { useNavigate } from "react-router-dom"

function VideojuegosPage() {
    const [listaVideojuegos, setListaVideojuegos] = useState([])
    const [categorias, setCategorias] = useState([])

    const navigate = useNavigate();

    
    function logout() {
        localStorage.clear()
        navigate("/")
    }
    
    async function filtrar(categoria) {
        const URL = `${params.BACKEND_URL}/videojuegos/`
        
        let response
        if (categoria == "-1") {
            response =  await fetch(URL, {
                headers : {
                    "x-token" : localStorage.getItem("TOKEN")
                }
            })
        }else {
            response =  await fetch(`${URL}?categoria=${categoria}`, {
                headers : {
                    "x-token" : localStorage.getItem("TOKEN")
                }
            })
        }
        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        setListaVideojuegos(data.data)
    }

    async function obtenerVideojuegosHTTP() {
        const URL = `${params.BACKEND_URL}/videojuegos/`
        const response = await fetch(URL, {
            headers : {
                "x-token" : localStorage.getItem("TOKEN")
            }
        })

        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        console.log(data)
        setListaVideojuegos(data.data)
    }

    async function obtenerCategoriasHTTP() {
        const URL = `${params.BACKEND_URL}/categorias/`
        const response = await fetch(URL, {
            headers : {
                "x-token" : localStorage.getItem("TOKEN")
            }
        })

        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        setCategorias(data.data)
    } 

    useEffect(function(){
        obtenerVideojuegosHTTP()
        obtenerCategoriasHTTP()
    }, [])

    return <div className="px-4">
        <Titulo onLogout={ logout }/>
        <Filtro categorias={ categorias } onFiltro={ filtrar } />
        <hr className="mb-4" />
        <GrillaVideojuegos listaVideojuegos={ listaVideojuegos } />
    </div>
}

export default VideojuegosPage