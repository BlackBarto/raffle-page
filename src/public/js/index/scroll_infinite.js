import { numbersPlace, insertNumbersBySearch, insertNumbers } from "./insert_numbers.js"
import { searchingState, listOfChilds, changeState } from "./state_control.js"

const numbersSection = document.querySelector(".numbers__section") // This is the sections that contains the numbers and loading
let prevObserverElement = null // This is the element that will be observed to add new numbers to ui

const choseFunction = ([{isIntersecting}]) => {
    if (!isIntersecting) return

    const { isSearching, search, numbers, isFiltering, lastNumber } = searchingState

    if (isSearching) {
        const { lastChild, thereIsSpace, currentNumber } = insertNumbersBySearch({numbers, search, numbersToShow: lastNumber, isFiltering})
        changeState({ lastNumber: currentNumber })
        enableObserver(lastChild, thereIsSpace)
    } else {
        const { lastChild, thereIsSpace, currentNumber } = insertNumbers({numbers, numbersToShow: lastNumber, isFiltering})
        changeState({ lastNumber: currentNumber })
        enableObserver(lastChild, thereIsSpace)
    }
}

const observer = new IntersectionObserver(choseFunction, {
    root: numbersSection,
    threshold: .8
})

export default function enableObserver(element, thereIsSpace) {
    if (thereIsSpace) {
        if (prevObserverElement) observer.unobserve(prevObserverElement)
        observer.observe(element)
        prevObserverElement = element
    } else {
	observer.unobserve(prevObserverElement)
    }
}
