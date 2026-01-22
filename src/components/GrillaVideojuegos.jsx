import CardVideojuego from "./CardVideojuego"

function GrillaVideojuegos() {
    const listaVideojuegos = [
        {
            nombre: "CSGO",
            imagen : "/imagenes/csgo.jpg",
            descripcion : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor eros sed semper aliquam. Duis quis tellus libero. Quisque consequat mauris eu molestie vestibulum. Nunc at ligula aliquet, accumsan dui ac, lacinia nulla. Quisque in aliquam nisl. Maecenas faucibus est orci, non facilisis arcu vestibulum ut. Nulla congue dapibus sagittis. Pellentesque et lectus at ante convallis tristique vitae in dolor. Donec varius mauris id enim cursus ultrices. Sed a lobortis quam.",
            categoria : "FPS"
        },{
            nombre: "GTA6",
            imagen : "https://www.pngall.com/wp-content/uploads/15/Grand-Theft-Auto-VI-Logo-PNG-Images.png",
            descripcion : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
            categoria : "OpenWorld"
        }
    ]


    return <div className="grid grid-cols-3 gap-2">
        {
            listaVideojuegos.map(function(videojuego) {
                return <CardVideojuego 
                    key={videojuego.nombre} 
                    videojuego={videojuego} />
            })
        }
    </div>
}

export default GrillaVideojuegos