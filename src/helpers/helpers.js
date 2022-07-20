export const validNumer = num => {
    return !isNaN(num) && parseInt(num) <= 200 && parseInt(num) >= 1 && Number.isInteger(num)
}

export const isSameDomain = (req, res, next) => {
    if (req.get("origin") === "http://localhost:4000") next()
    else res.send("ERES UN HACKER")
}
