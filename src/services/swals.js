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
                text: 'Hubo un error al editar tu información, vuelve a intentarlo!',
            })
            break;
        case "CANCEL-APPOINTMENTS":
            Swal.fire(
                'Excelente!',
                'Tu cita a sido cancelada con existo!',
                'success'
            )
            break;
        case "ERROR-CANCEL-APPOINTMENTS":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cancelar tu cita, vuelve a intentarlo!',
            })
            break;
        case "REPORT-APPOINTMENTS":
            Swal.fire(
                'Excelente!',
                'Tu cita a sido reportada con existo, gracias por tomarte el tiempo de reportarlo!',
                'success'
            )
            break;
        case "ERROR-REPORT-APPOINTMENTS":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al reportar tu cita, vuelve a intentarlo!',
            })
            break;
        case "EMPTY-INPUT":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No has escrito qué sucedió! si no llenas el campo, no podrás reportar la cita!',
            })
            break;
        case "CONFIRM-APPOINTMENT":
            Swal.fire(
                'Excelente!',
                'Tu cita a sido confirmada con existo, gracias por utilizar nuestro servicio! Se te notificará en caso de que la cita que agendaste sea confirmada o por el contrario rechazada.',
                'success'
            )
            break;
        case "EMPTY-INPUT-CONFIRM-APPOINTMENT":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No has suministrado la información necesaria para agendar tu cita, llena los campos y vuelve a intentarlo!',
            })
            break;
        case "ERROR-CONFIRM-APPOINTMENT":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al confirmar tu cita, por favor vuelve a intentarlo!',
            })
            break;
        default: break
    }
}