import { numbersPlace, insertNumbersBySearch, insertNumbers } from "./insert_numbers.js"
import { searching, search, numbers, isFiltering } from "./main.js"

const numbersSection = document.querySelector(".numbers__section") // This is the sections that contains the numbers and loading
let prevObserverElement = null // This is the element that will be observed to add new numbers to ui
export const listOfChilds = numbersPlace.childNodes // This is a live list of childs on numbersPlace, that is the list of numbers that are currently showed

const choseFunction = ([{isIntersecting}]) => {
    if (isIntersecting) {
        if (searching) {
            const numbersToShow = listOfChilds.length - 1
            const { lastChild, thereIsSpace } = insertNumbersBySearch({numbers, search, numbersToShow, isFiltering})
	    enableObserver(lastChild, thereIsSpace)
        }
        else {
	    const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length, isFiltering})
	    enableObserver(lastChild, thereIsSpace)
	}
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
