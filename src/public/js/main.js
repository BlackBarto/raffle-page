import {insertNumbers, insertDefault} from "./insert_numbers.js";

const search = document.getElementById("searcher-input")

// This varliable (numbers) will have the numbers that have already been chosen when the window load
let numbers = null

// When the window load, insert some numbers that are available to choose
window.addEventListener("load", async () => {
    // Get all numbers that are currenly choosen
    numbers = await fetch("/api/getAllNumbers").then(res => res.json())
    // Execute a function that insert 10 numbers that aren't in the numbers fetched up above
    insertDefault(numbers)
})

search.addEventListener("change", ({target: {value}}) => {
})
