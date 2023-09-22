export const printDate = (date) => {
    const dateAux = new Date(date).toLocaleDateString()
    const hours = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    return `${dateAux.split("/")[0]} ${month(dateAux.split("/")[1])} -
        ${getHours(hours)}:${minutes < 10 ? `0${minutes}` : minutes}${hours < 12 ? "am" : "pm"}`
}

export const month = (month) => {
    switch (month) {
        case "1": return "Ene"
        case "2": return "Feb"
        case "3": return "Mar"
        case "4": return "Abr"
        case "5": return "May"
        case "6": return "Jun"
        case "7": return "Jul"
        case "8": return "Ago"
        case "9": return "Sep"
        case "10": return "Oct"
        case "11": return "Nov"
        case "12": return "Dic"
        default: return ""
    }
}

export const getHours = (hour) => {
    switch (hour) {
        case 13: return 1
        case 14: return 2
        case 15: return 3
        case 16: return 4
        case 17: return 5
        case 18: return 6
        case 19: return 7
        case 20: return 8
        case 21: return 9
        case 22: return 10
        case 23: return 11
        case 24: return 12
        default: return hour
    }
}