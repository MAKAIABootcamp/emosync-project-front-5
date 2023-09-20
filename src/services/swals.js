import Swal from "sweetalert2"

export const swals = (type, navigate = null) => {
    switch (type) {
        case "REGISTER-ERROR":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ese correo ya está en uso, prueba con otro!',
            })
        case "CHANGE-INFO":
            Swal.fire(
                'Excelente!',
                'Información cambiada con exito!',
                'success'
            ).then(
                () => {
                    navigate("/profile")
                }
            )
            break;
        case "CHANGE-SUBSCRIPTION":
            Swal.fire(
                'Excelente!',
                'Información cambiada con exito, tu nueva suscripción se verá reflejado en tu siguiente cobro!',
                'success'
            ).then(
                () => {
                    navigate("/profile")
                }
            )
            break;
        case "NO-CHANGE":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No has hecho ningún cambio, vuelve a intentarlo!',
            })
            break;
        case "ERROR-EDIT-INFO":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No has hecho ningún cambio, vuelve a intentarlo!',
            })
            break;
        default: break
    }
}