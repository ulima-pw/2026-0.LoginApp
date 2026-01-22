function Filtro() {
    return <form className="my-4">
        <div className="mb-2">
            <label className="mr-2">Categorías:</label>
            <select className="border rounded-sm w-40">
                <option>FPS</option>
                <option>RPG</option>
                <option>Estrategia</option>
            </select>
        </div>
        <button className="bg-orange-600 py-2 px-4 rounded-md text-white hover:bg-orange-200 hover:text-gray-700">
            Filtrar
        </button>
    </form>
}

export default Filtro