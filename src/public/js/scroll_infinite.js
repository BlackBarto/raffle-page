import { numbersPlace, insertNumbersBySearch, insertNumbers } from "./insert_numbers.js"
import { searching, search, numbers } from "./main.js"

export const listOfChilds = numbersPlace.childNodes // This is a live list of childs on numbersPlace, that is the list of numbers that are currently showed
let prevObserverElement = null // This is the element that will be observed to add new numbers to ui
const numbersSection = document.querySelector(".numbers__section") // This is the sections that contains the numbers and loading

const choseFunction = ([{isIntersecting}], observer) => {
    if (isIntersecting) {
        if (searching) {
            const numbersToShow = listOfChilds.length - 1
            const { lastChild, thereIsSpace } = insertNumbersBySearch({numbers, search, numbersToShow})
	    enableObserver(lastChild, thereIsSpace)
        }
        else {
	    const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length})
	    enableObserver(lastChild, thereIsSpace)
	}
    }
}

const observer = new IntersectionObserver(choseFunction, {
    root: numbersSection,
    threshold: 1
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
