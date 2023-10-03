import Swal from "sweetalert2"
import "./main.scss"
import { useEditDataUserMutation } from "../../../store/api/firebaseApi"


export const modalAddStripe = async () => {

    const { value: day } = await Swal.fire({
        title: 'Selecciona un día en el que quieras trabajar',
        input: 'select',
        inputOptions: {
          lunes: 'Lunes',
          martes: 'Martes',
          miercoles: 'Miercoles',
          jueves: 'Jueves',
          viernes: 'Viernes',
          sabado: 'Sabado',
          domingo: 'Domingo'

        },
        inputPlaceholder: 'Selecciona un día',
        showCancelButton: true,
        confirmButtonColor: '#F26419',
         cancelButtonColor: '#A4A4A4',
         confirmButtonText: 'Listo',
         cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== undefined || null) {
              resolve()
            } else {
              resolve('Necesitas seleccionar un día')
            }
          })
        }
      })
      if (day) {
        const { value: hourStart } = await Swal.fire({
            title: 'Selecciona la hora en la que quieras empezar a trabajar',
        
            input: 'select',
            inputOptions: {
                hora8: '8:00 AM',
                hora9: '9:00 AM',
                hora10: '10:00 AM',
                hora11: '11:00 AM',
                hora12: '12:00 PM',
                hora13: '1:00 PM',
                hora14: '2:00 PM',
                hora15: '3:00 PM',
                hora16: '4:00 PM',
                hora17: '5:00 PM',
                hora18: '6:00 PM',
                hora19: '7:00 PM',
                hora20: '8:00 PM'
    
            },
            inputPlaceholder: 'Selecciona una hora',
            showCancelButton: true,
            confirmButtonColor: '#F26419',
             cancelButtonColor: '#A4A4A4',
             confirmButtonText: 'Listo',
             cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value !== undefined || null) {
                  resolve()
                } else {
                  resolve('Necesitas seleccionar una hora')
                }
              })
            }

          })
          if (hourStart){  
            const { value: hourEnd } = await Swal.fire({
                title: 'Selecciona la hora en la que quieras terminar de trabajar',
                input: 'select',
                inputOptions: {
                    hora9: '9:00 AM',
                    hora10: '10:00 AM',
                    hora11: '11:00 AM',
                    hora12: '12:00 PM',
                    hora13: '1:00 PM',
                    hora14: '2:00 PM',
                    hora15: '3:00 PM',
                    hora16: '4:00 PM',
                    hora17: '5:00 PM',
                    hora18: '6:00 PM',
                    hora19: '7:00 PM',
                    hora20: '8:00 PM',
                    hora21: '9:00 PM'
                },
                inputPlaceholder: 'Selecciona una hora',
                showCancelButton: true,
                confirmButtonColor: '#F26419',
                 cancelButtonColor: '#A4A4A4',

                 confirmButtonText: 'Listo',
                 cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                  return new Promise((resolve) => {
                    if (value !== undefined || null) {
                      resolve()
                    } else {
                      resolve('Necesitas seleccionar una hora')
                    }
                  })
                }
    
              })
              if(hourEnd){
                const [editDataUser] = useEditDataUserMutation()
                const dayExists = user.stripe.some(item => item.day === day);

                if (!dayExists) {
                  const key = user.key
                  const formData = {
                    stripe: [
                      ...user.stripe,
                      {
                        day: day,
                        start: hourStart,
                        end: hourEnd,
                      }
                    ]
                  };

                  // Aquí puedes enviar formData o realizar cualquier otra operación con él
                  await editDataUser({ formData, key })
                  Swal.fire({
                    title: 'Horario creado con exito!',
                    confirmButtonColor: '#F26419',
                    confirmButtonText: 'Listo',
                  })



                } else {
                  Swal.fire({
                    title: 'El día seleccionado ya lo tienes ocupado con otro horario diferente.',
                    confirmButtonColor: '#F26419',
                    confirmButtonText: 'Listo',
                  })
                }
            

                
              }
          }
      }
}



export function obtenerFechaFormateada() {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril',
      'mayo', 'junio', 'julio', 'agosto',
      'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const fechaActual = new Date();
    const dia = fechaActual.getDate(); // Obtiene el día del mes (1-31)
    const mes = fechaActual.getMonth(); // Obtiene el mes (0-11)
  
    // Formatea la fecha en un string "d de mes"
    const fechaFormateada = `${dia} de ${meses[mes]}`;
  
    return fechaFormateada;
  }