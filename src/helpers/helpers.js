export const isSameDomain = (req, res, next) => {
    if (req.get("origin") === "https://raffle-page-develoment.up.railway.app/") next()
    else res.json({message: "your aren't allowed to do this from this origin"})
}

export const validNumer = num => {
    let isValidNumber = true
    const errors = []
    if (isNaN(num)) {
	    isValidNumber = false
	    errors.push("It isn't a valid number")
    }
    if (parseInt(num) > 200 || parseInt(num) < 1) {
	    isValidNumber = false
	    errors.push("It isn't between of 1 and 200")
    }
    if (Number.isInteger(num)) {
	    isValidNumber = false
        errors.push("It isn't a integrer, have decimals") 
    }
    return {isValidNumber, errors}
}

export const validData = ({name, email}) => {
    const invalidCharacters = ["ñ", "-", "|", "°", "~", ",", ";", "{", "}", "[", "]", "*", "+", "#", "$", "¬"]
    const errors = []
    let isValid = true

    if (!email.length || !email.includes("@") || !email.includes(".") || invalidCharacters.some(e => email.includes(e)) || !email.split("@")[0].length >= 1 || !email.split("@")[1].length >= 3) {
        isValid = false
        errors.push("Email is invalid")
    }

    return {isValid, errors}
}
