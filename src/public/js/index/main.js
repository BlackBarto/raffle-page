import enableObserver, { listOfChilds } from "./scroll_infinite.js";
import {numbersPlace, insertNumbersBySearch, insertNumbers} from "./insert_numbers.js"
import { changeState, searchingState, changeProductsOnUI } from "./state_control.js"

// When the window load, insert some numbers that are available to choose
window.addEventListener("load", async () => {
    // Get all numbers that are currenly choosen and save them in "numbers" variable
    const numbers = await fetch("/api/getAllNumbers").then(res => res.json())

    changeState({ numbers: numbers })

    changeProductsOnUI(insertNumbers)
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
