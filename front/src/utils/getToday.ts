export function getToday() {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${today.getFullYear()}`;
}

export function transformDate(date: string) {
    const dateArr = date.split("-")
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
}