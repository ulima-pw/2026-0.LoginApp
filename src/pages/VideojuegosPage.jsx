import Filtro from "../components/Filtro"
import GrillaVideojuegos from "../components/GrillaVideojuegos"
import Titulo from "../components/Titulo"

function VideojuegosPage() {
    return <div className="px-4">
        <Titulo />
        <Filtro />
        <hr className="mb-4" />
        <GrillaVideojuegos />
    </div>
}

export default VideojuegosPage