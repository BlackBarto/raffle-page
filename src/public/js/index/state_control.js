import enableObserver, { listOfChilds } from "./scroll_infinite.js";
import {numbersPlace, insertNumbersBySearch, insertNumbers} from "./insert_numbers.js"

const searchInput = document.getElementById("searcher-input") // This variable have the search input
const searchBtn = document.getElementById("searcher-btn") // This variable have the search btn (in other words, the btn that run the search)
const searchFilter = document.getElementById("searcher-filter") // This variable have the search filter (the btn that enable or disable a filter about what numbers can$
const numbersLoading = document.getElementById("numbers-loading")

export const searchingState = {
    numbers: null,
    isSearching: false,
    isFiltering: false,
    search: ""
}

export const changeState = obj => {
    Object.entries(obj).forEach( ([key, value]) => {
         searchingState[key] = value
    })
}

export const changeProductsOnUI = callback => {
    const { numbers, isFiltering, search } = searchingState

    numbersPlace.innerHTML = ""
    numbersLoading.classList.remove("no-visible")

    const { lastChild, thereIsSpace } = callback({numbers, numbersToShow: listOfChilds.length, isFiltering, search})
    enableObserver(lastChild, thereIsSpace)

    numbersLoading.classList.add("no-visible")
}

searchBtn.addEventListener("click", e => {
    e.preventDefault()
    let value = searchInput.value
    if (value.length && !isNaN(value) && parseInt(value) <= 200 && parseInt(value) >= 1 && value !== searchingState.search) {
        changeState({isSearching: true, search: value})

        changeProductsOnUI(insertNumbersBySearch)
    } else if (value === "") {
        changeState({search: "", isSearching: false})

        changeProductsOnUI(insertNumbers)
    }
})

searchFilter.addEventListener("click", e => {
    e.preventDefault()

    changeState({ isFiltering: !searchingState.isFiltering})

    if (searchingState.isSearching) {
        changeProductsOnUI(insertNumbersBySearch)
    } else {
        changeProductsOnUI(insertNumbers)
    }
})
