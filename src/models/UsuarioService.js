import params from "../params"

export default function useUsuarioService() {    
    
    async function loginHTTP(correo, password) {
        const resp = await fetch(`${params.BACKEND_URL}/login`, {
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
            const data = await resp.json()
            console.error("ERROR:", data)
            return false
        }

        const data = await resp.json()
        if (data.msg == "Acceso concedido"){
            localStorage.setItem("TOKEN", data.token)
            return true
        }else {
            console.error(data.detail)
            return false
        }
    }

    return {
        loginHTTP
    }
}