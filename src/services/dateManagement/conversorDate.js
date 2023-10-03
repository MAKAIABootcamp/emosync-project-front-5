export function convertirFechaEnMilisegundos(fechaEnMilisegundos) {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const fecha = new Date(fechaEnMilisegundos);
  
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = hora >= 12 ? 'pm' : 'am';
  
    // Formatear la hora en el formato de 12 horas
    const hora12 = hora % 12 === 0 ? 12 : hora % 12;
  
    const fechaFormateada = `${dia} de ${mes} ${hora12}:${minutos < 10 ? '0' : ''}${minutos}${ampm}`;
  
    return fechaFormateada;
  }
  
  export function conversorToCalendarDate(milisegundos) {
    const fecha = new Date(milisegundos);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');
  
    const fechaHora = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return fechaHora;
  }