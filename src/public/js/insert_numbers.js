const numbersPlace = document.getElementById("numbers-place")

export const insertNumbers = ({number, isValid}) => {
    const numerElement = document.createElement("article")
    numerElement.classList.add("numbers__number")
    numerElement.innerHTML = `
    <div class="numbers__container-info">
        <h3 class="numbers__h3">Number: ${number}</h3>
        <p class="numbers__p">${isValid ? "Available" : "Reserved"}</p>
    </div>
    <button class="numbers__btn">Apartar</button>
    `

    numbersPlace.appendChild(numerElement)
}

export const insertDefault = numbers => {
    let insertions = 0
    for (let i = 0; insertions < 11; i++) {
	if (numbers.includes(i)) continue
	insertions++
	insertNumbers({number: i, isValid: true})
    }
}
