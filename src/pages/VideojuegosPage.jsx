import { useEffect, useState } from "react"
import Filtro from "../components/Filtro"
import GrillaVideojuegos from "../components/GrillaVideojuegos"
import Titulo from "../components/Titulo"
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
        const URL = "https://script.google.com/macros/s/AKfycbyM6p40ois-vNNIbSBBXCcagOxi2Zp4NR6NKXUBYfaXg4HdFZR5XIAxXLhEr4Txg3goQg/exec"
        
        let response
        if (categoria == "-1") {
            response =  await fetch(URL)
        }else {
            response =  await fetch(`${URL}?categoria=${categoria}`)
        }
        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        setListaVideojuegos(data)
    }

    async function obtenerVideojuegosHTTP() {
        const URL = "https://script.google.com/macros/s/AKfycbyM6p40ois-vNNIbSBBXCcagOxi2Zp4NR6NKXUBYfaXg4HdFZR5XIAxXLhEr4Txg3goQg/exec"
        const response = await fetch(URL)

        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        console.log(data)
        setListaVideojuegos(data)
    }

    async function obtenerCategoriasHTTP() {
        const URL = "https://script.google.com/macros/s/AKfycbyM6p40ois-vNNIbSBBXCcagOxi2Zp4NR6NKXUBYfaXg4HdFZR5XIAxXLhEr4Txg3goQg/exec?tipo=categorias"
        const response = await fetch(URL)

        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        setCategorias(data)
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