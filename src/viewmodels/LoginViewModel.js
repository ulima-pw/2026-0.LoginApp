import { useEffect, useState } from "react"
import params from "../params"
import { useNavigate } from "react-router-dom"
import useUsuarioService from "../models/UsuarioService"

export default function useLoginViewModel() {
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

    async function login(correo, password) {
        const usuarioService = useUsuarioService()
        
        const resultadoLogin = await usuarioService.loginHTTP(correo, password)

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

    return {
        mensajeVisible,
        setMensajeVisible,
        login,
    }
}