const numbersPlace = document.getElementById("numbers-place")

export const insertNumbers = ({number, isValid}) => {
    const numElement = document.createElement("div")
    numElement.classList.add("numbers__number")
    if (!isValid) numElement.classList.add("not-available")

    numElement.innerHTML = `
    <div class="numbers__number-info">
        <h3 class="numbers__h3"><span>Number: </span>${number}</h3>
        <p class="numbers__p"><span>State: </span>${isValid ? "Available" : "Reserved"}</p>
    </div>
    <div class="numbers__container-btn"><button class="numbers__btn">Apartar</button></div>
    `

    numbersPlace.appendChild(numElement)
}

export const insertDefault = numbers => {
    let insertions = 0
    for (let i = 1; i <= 10; i++) {
	let isValid = true
	if (numbers.includes(i)) isValid = false
	insertions++
	insertNumbers({number: i, isValid})
    }
}
