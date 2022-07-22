import enableObserver, { listOfChilds } from "./scroll_infinite.js";
import {numbersPlace, insertNumbersBySearch, insertNumbers} from "./insert_numbers.js"

const searchInput = document.getElementById("searcher-input") // This variable have the search input
const searchBtn = document.getElementById("searcher-btn") // This variable have the search btn (in other words, the btn that run the search)
const searchFilter = document.getElementById("searcher-filter") // This variable have the search filter (the btn that enable or disable a filter about what numbers can be displayed)
const numbersLoading = document.getElementById("numbers-loading")
export let numbers = null
export let searching = false
export let isFiltering = false
export let search = ""

// When the window load, insert some numbers that are available to choose
window.addEventListener("load", async () => {
    // Get all numbers that are currenly choosen and save them in "numbers" variable
    numbers = await fetch("/api/getAllNumbers").then(res => res.json())

    // Execute a function that will add 10 numbers to numbers place, whether them are choosen or not
    const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length, isFiltering})

    // Execute a function that enable an observer that will insert 10 numbers and changing its classes if it's in the numbers fetched above
    enableObserver(lastChild, thereIsSpace)

    // Hide the loading, because the numbers are alredy in UI
    numbersLoading.classList.add("no-visible")
})

searchBtn.addEventListener("click", e => {
    e.preventDefault()
    let value = searchInput.value
    if (value.length && !isNaN(value) && parseInt(value) <= 200 && parseInt(value) >= 1 && value !== search) {
	searching = true
	search = value
	numbersPlace.innerHTML = ""

        // Show the loading, because the numbers aren't in UI
        numbersLoading.classList.remove("no-visible")

	// Execute a function that insert 10 numbers that start with the search value and returns the last element of numbers place and if is possible insert more numbers
	const { lastChild, thereIsSpace } = insertNumbersBySearch({numbers, search, numbersToShow: listOfChilds.length, isFiltering})
	enableObserver(lastChild, thereIsSpace)

        // Hide the loading, because the numbers are alredy in UI
        numbersLoading.classList.add("no-visible")
    } else if (value === "") {
	searching = false
        search = ""
	numbersPlace.innerHTML = ""

        numbersLoading.classList.remove("no-visible")

        const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length, isFiltering})
        enableObserver(lastChild, thereIsSpace)

        numbersLoading.classList.add("no-visible")
    }
})

searchFilter.addEventListener("click", e => {
    e.preventDefault()
    isFiltering = !isFiltering
    numbersPlace.innerHTML = ""

    // Show the loading, because the numbers aren't in UI
    numbersLoading.classList.remove("no-visible")

    if (searching) {
        // Execute a function that will add 10 numbers to numbers place, whether them are choosen or not
        const { lastChild, thereIsSpace } = insertNumbersBySearch({numbers, search, numbersToShow: listOfChilds.length, isFiltering})

        // Execute a function that enable an observer that will insert 10 more numbers
        enableObserver(lastChild, thereIsSpace)

        // Hide the loading, because the numbers aren't in UI
        numbersLoading.classList.add("no-visible")
    } else {
        // Execute a function that will add 10 numbers to numbers place
        const { lastChild, thereIsSpace } = insertNumbers({numbers, numbersToShow: listOfChilds.length, isFiltering})

        // Execute a function that enable an observer that will insert 10 more numbers
        enableObserver(lastChild, thereIsSpace)

        // Hide the loading, because the numbers are alredy in UI
        numbersLoading.classList.add("no-visible")
    }
})

