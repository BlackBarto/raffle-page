import enableObserver from "./scroll_infinite.js";
import {numbersPlace} from "./insert_numbers.js"

const numbersLoading = document.getElementById("numbers-loading")
export const listOfChilds = numbersPlace.childNodes // This is a live list of childs on numbersPlace, that is the list of numbers that are currently showed

export const searchingState = {
    numbers: null,
    isSearching: false,
    isFiltering: false,
    search: "",
    lastNumber: listOfChilds.length
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

    const { lastChild, thereIsSpace, currentNumber } = callback({numbers, numbersToShow: searchingState.lastNumber, isFiltering, search})
    searchingState.lastNumber = currentNumber

    enableObserver(lastChild, thereIsSpace)
    numbersLoading.classList.add("no-visible")
}
