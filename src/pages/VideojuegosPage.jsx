import { useEffect, useState } from "react"
import Filtro from "../components/Filtro"
import GrillaVideojuegos from "../components/GrillaVideojuegos"
import Titulo from "../components/Titulo"
import { useNavigate } from "react-router-dom"

const lista = [
    {
        nombre: "CSGO",
        imagen: "/imagenes/csgo.jpg",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor eros sed semper aliquam. Duis quis tellus libero. Quisque consequat mauris eu molestie vestibulum. Nunc at ligula aliquet, accumsan dui ac, lacinia nulla. Quisque in aliquam nisl. Maecenas faucibus est orci, non facilisis arcu vestibulum ut. Nulla congue dapibus sagittis. Pellentesque et lectus at ante convallis tristique vitae in dolor. Donec varius mauris id enim cursus ultrices. Sed a lobortis quam.",
        categoria: "FPS"
    }, {
        nombre: "GTA6",
        imagen: "https://www.pngall.com/wp-content/uploads/15/Grand-Theft-Auto-VI-Logo-PNG-Images.png",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        categoria: "OpenWorld"
    }
]

function VideojuegosPage() {
    const categorias = [
        "FPS", "OpenWorld"
    ]
    const [listaVideojuegos, setListaVideojuegos] = useState([])

    const navigate = useNavigate();

    function filtrar(categoria) {
        if (categoria == "-1") {
            setListaVideojuegos(lista)
        }else {
            const listaVideojuegosModificado = lista.filter( function(vj) {
                return vj.categoria == categoria
            } )
            setListaVideojuegos(listaVideojuegosModificado)
        }
    }

    function logout() {
        localStorage.clear()
        navigate("/")
    }

    async function obtenerVideojuegosHTTP() {
        const URL = "https://script.google.com/macros/s/AKfycbxMZbg2ZTtWjfgmRVP25A2Kt6i02_SDLcu1asfc9CKNXDxLISrTxqaoK5pdgBrjmc1Ijw/exec"
        const response = await fetch(URL)

        if (!response.ok) {
            console.error("Error de peticion. " + response.status)
            return
        }

        const data = await response.json()
        console.log(data)
        setListaVideojuegos(data)

    }

    useEffect(function(){
        obtenerVideojuegosHTTP()
    }, [])

    return <div className="px-4">
        <Titulo onLogout={ logout }/>
        <Filtro categorias={ categorias } onFiltro={ filtrar } />
        <hr className="mb-4" />
        <GrillaVideojuegos listaVideojuegos={ listaVideojuegos } />
    </div>
}

export default VideojuegosPage