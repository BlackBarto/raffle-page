export const validNumer = num => {
    return !isNaN(num) && parseInt(num) <= 200 && parseInt(num) >= 1 && Number.isInteger(num)
}
