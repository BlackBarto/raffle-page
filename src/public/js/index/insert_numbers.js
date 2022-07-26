export const numbersPlace = document.getElementById("numbers-place")

const createNumbers = ({number, isValid}) => {
    const stateOfNumber = isValid ? "Available" : "Reserved"
    const numElement = document.createElement("div")
    numElement.classList.add("numbers__number")
    if (!isValid) numElement.classList.add("not-available")

    numElement.innerHTML = `
    <div class="numbers__number-info">
        <h3 class="numbers__h3"><span>Number: </span>${number}</h3>
        <p class="numbers__p"><span>State: </span>${stateOfNumber}</p>
    </div>
    <div class="numbers__container-btn">
        <button data-number="${number}" data-state="${stateOfNumber}" name="btn-choose-number" class="numbers__btn">Apartar</button>
    </div>
    `

    return numElement
}

export const insertNumbersBySearch = ({numbers, search, numbersToShow, isFiltering}) => {
    const numbersFragment = new DocumentFragment()
    let thereIsSpace = true

    if (!numbersToShow) {
	    if (!isFiltering || !numbers.includes(parseInt(search))) {
	        const number = createNumbers({number: search, isValid: !numbers.includes(parseInt(search))})
	        numbersFragment.appendChild(number)
	    }
    }

    for (let i = numbersToShow; i < numbersToShow + 9; i++) {
	    let num = ""
	    if (i >= 10) {
	        num = i >= 20 ? "" + (i - 10) : "0" + (i - 10)
	    } else num = "" + i
	    const numberToCreate = parseInt(search + num)

	    if (isFiltering && numbers.includes(numberToCreate)) continue

	    if (numberToCreate > 200) {
	        thereIsSpace = false
	        break
	    }
	    const numberElement = createNumbers({number: numberToCreate, isValid: !numbers.includes(numberToCreate)})
	    numbersFragment.appendChild(numberElement)
    }

    numbersPlace.appendChild(numbersFragment)
    return {lastChild: numbersPlace.lastChild, thereIsSpace}
}


/*
*  numbers: This param is an array of numbers that are alredy choosen by another contestant
*  numbersToShow: This param is a number that represent the amount of childs of numbers place
*/
export const insertNumbers = ({numbers, numbersToShow, isFiltering}) => {
    const numbersFragment = new DocumentFragment()
    let thereIsSpace = true

    // This for generate 10 more numbers while "i" being less or equal than "numbersToShow + 10" and 200 (200 is the higger number on this raffle)
    for (let i = numbersToShow + 1; i <= numbersToShow + 10; i++) {
	    if (isFiltering && numbers.includes(i)) continue

	    if (i > 200) {
	        thereIsSpace = false
	        break
	    }

	    const number = createNumbers({number: i, isValid: !numbers.includes(i)})
	    numbersFragment.appendChild(number)
    }

    numbersPlace.appendChild(numbersFragment)
    return { lastChild: numbersPlace.lastChild, thereIsSpace }
}
