import { useEffect, useState } from "react"
import Cabecera from "../components/Cabecera"
import Formulario from "../components/Formulario"
import Mensaje from "../components/Mensaje"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
    const [mensajeVisible, setMensajeVisible] = useState(false)

    const navigate = useNavigate()

    useEffect(function() {
        const datosLogin = localStorage.getItem("DATOS_LOGIN")
        if (datosLogin != null) {
            const login = JSON.parse(datosLogin)
            if (login.ingreso == true) {
                navigate("/main")
                return
            }
        }
    }, [])

    async function loginHTTP(correo, password) {
        const resp = await fetch("http://127.0.0.1:8000/login", {
            method : "post",
            body : JSON.stringify({
                username : correo,
                password : password
            }),
            headers : {
                "content-type" : "application/json"
            }
        })
        if (resp.status != 200) {
            // Error en login
            console.error(resp.statusText)
            return false
        }

        const data = await resp.json()
        if (data.msg == "Acceso concedido"){
            return true
        }else {
            console.error(data.detail)
            return false
        }
    }

    async function login(correo, password) {

        const resultadoLogin = await loginHTTP(correo, password)

        if (resultadoLogin) {
            console.log("Login correcto")
            navigate("/main")

            const datosLogin = {
                ingreso : true,
                correo : correo,
                cantidadIntentos : 0
            }
            localStorage.setItem("DATOS_LOGIN", JSON.stringify(datosLogin))

        }else {
            setMensajeVisible(true)
            const datosLogin = localStorage.getItem("DATOS_LOGIN")
            if (datosLogin == null) {
                const login = {
                    ingreso : false,
                    cantidadIntentos : 1
                }
                localStorage.setItem("DATOS_LOGIN", JSON.stringify(login))
            }else {
                const login = JSON.parse(datosLogin)
                login.cantidadIntentos++
                localStorage.setItem("DATOS_LOGIN", JSON.stringify(login))
            }
            
        }
    }

    return <div className="flex justify-center">
        <div className="border-2 rounded-lg border-gray-300 shadow-md p-4">
            <Cabecera />
            <Formulario onLogin={ login } />
            <Mensaje msg={"Login error"} visible={mensajeVisible} />
        </div>
    </div>
}

export default LoginPage