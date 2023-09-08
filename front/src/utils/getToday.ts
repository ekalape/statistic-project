export function getToday() {
    const today = new Date();
    return today.toLocaleDateString()
}


export function transformDate(date: string) {
    const dateArr = date.split("-")
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
}