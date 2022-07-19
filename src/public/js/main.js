import {insertNumbers, insertDefault} from "./insert_numbers.js";

const search = document.getElementById("searcher-input")

window.addEventListener("load", async () => {
    const data = await fetch("/api/getAllNumbers").then(res => res.json())
    insertDefault(data)
})

search.addEventListener("change", ({target: {value}}) => {
    console.log("Antes del Fetch", value)
    fetch("/api/findNumbers", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({value: parseInt(value)}),
    })
        .then(res => res.json())
        .then(json => {
	    console.log("Antes del if", json)
            if (json.isValidNumber) {
		console.log("Dentro del if", json)
		insertNumbers(json)
	    }
        })
})


