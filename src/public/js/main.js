import enableObserver, { listOfChilds } from "./scroll_infinite.js";
import {numbersPlace, insertNumbersBySearch, insertNumbers} from "./insert_numbers.js"

const searchInput = document.getElementById("searcher-input") // This variable have the search input
const searchBtn = document.getElementById("searcher-btn") // This variable have the search btn (in other words, the btn that run the search)
const searchFilter = document.getElementById("searcher-filter") // This variable have the search filter (the btn that enable or disable a filter about what numbers can be displayed)
export let numbers = []
export let searching = false
export let search = ""

// When the window load, insert some numbers that are available to choose
window.addEventListener("load", async () => {
    // Get all numbers that are currenly choosen and save them in "numbers" variable
    numbers = await fetch("/api/getAllNumbers").then(res => res.json()).catch(err => console.log(err))

    // Execute a function that will add 10 numbers to numbers place, whether them are choosen or not
    const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length})

    // Execute a function that enable an observer that will insert 10 numbers and changing its classes if it's in the numbers fetched above
    enableObserver(lastChild, thereIsSpace)
})

searchBtn.addEventListener("click", e => {
    e.preventDefault()
    let value = searchInput.value
    if (value.length && !isNaN(value) && parseInt(value) <= 200 && parseInt(value) >= 1) {
	searching = true
	search = value
	numbersPlace.innerHTML = ""

	const { lastChild, thereIsSpace } = insertNumbersBySearch({numbers, search, numbersToShow: listOfChilds.length})
	enableObserver(lastChild, thereIsSpace)
    }
})

searchFilter.addEventListener("click", e => {
    e.preventDefault()
})
