import {numbersPlace, insertNumbersBySearch, insertNumbers} from "./insert_numbers.js"
import { changeState, searchingState, changeProductsOnUI, listOfChilds } from "./state_control.js"
import showMessage, { messagesPlace } from "./show_messages.js"

const searchInput = document.getElementById("searcher-input") // This variable have the search input
const searchBtn = document.getElementById("searcher-btn") // This variable have the search btn (in other words, the btn that run the search)
const searchFilter = document.getElementById("searcher-filter") // This variable have the search filter (the btn that enable or disable a filter about what numbers can$
const icons = searchFilter.querySelectorAll("i")

// When the window load, insert some numbers that are available to choose
window.addEventListener("load", async () => {
    showMessage({selector: ".messages article", fatherElement: messagesPlace})

    // Get all numbers that are currenly choosen and save them in "numbers" variable
    const numbers = await fetch("/api/getAllNumbers").then(res => res.json())

    changeState({ numbers: numbers })
    changeProductsOnUI(insertNumbers)
})

searchBtn.addEventListener("click", e => {
    e.preventDefault()
    let value = searchInput.value
    if (value.length && !isNaN(value) && parseInt(value) <= 200 && parseInt(value) >= 1 && value !== searchingState.search) {
        changeState({isSearching: true, search: value, lastNumber: 0})
        changeProductsOnUI(insertNumbersBySearch)
    } else if (value === "") {
        changeState({search: "", isSearching: false, lastNumber: 0})
        changeProductsOnUI(insertNumbers)
    }
})

searchFilter.addEventListener("click", e => {
    e.preventDefault()

    changeState({ isFiltering: !searchingState.isFiltering, lastNumber: 0})
    searchFilter.classList.toggle("filtering")
    icons.forEach(icon => icon.classList.toggle("no-visible"))

    if (searchingState.isSearching) {
        changeProductsOnUI(insertNumbersBySearch)
    } else {
        changeProductsOnUI(insertNumbers)
    }
})

numbersPlace.addEventListener("click", e => {
    const element = e.target
    const { number, state: isAvailable } = element.dataset

    if (isAvailable && isAvailable === "Available" && number && number.length && !isNaN(number) && parseInt(number) <= 200 && parseInt(number) >= 1) {
        element.classList.add("active")
        fetch("/api/chooseANumber", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({number})
        }).then(res => res.json()).then(({ok, url, errors}) => {
            if (ok) window.location.href = url
            else console.log(errors)
        })
    }
})
