
import useLoginViewModel from "../../viewmodels/LoginViewModel"
import Cabecera from "../components/Cabecera"
import Formulario from "../components/Formulario"
import Mensaje from "../components/Mensaje"


function LoginPage() {
    const viewmodel = useLoginViewModel()
    
    return <div className="flex justify-center">
        <div className="border-2 rounded-lg border-gray-300 shadow-md p-4">
            <Cabecera />
            <Formulario onLogin={ viewmodel.login } />
            <Mensaje msg={"Login error"} visible={ viewmodel.mensajeVisible } />
        </div>
    </div>
}

export default LoginPage