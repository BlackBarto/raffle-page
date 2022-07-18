export const numbersPlace = document.getElementById("numbers-place")

const insertNumbers = async () => {
    const res = await fetch("/api/getNumbers")
    const json = await res.json()
    const numbersFragment = new DocumentFragment()
    for (let i = 1; i <= 200; i++) {
        const availableState = json.includes(i) ? "Apartado" : "Disponible"
        const classes = json.includes(i) ? ["numbers__number", "noAvailble"] : ["numbers__number"]
        const number = document.createElement("article")
        number.classList.add(...classes)

        number.innerHTML = `
        <div class="numbers__container-info">
            <h3 class="numbers__h3">Numero: ${i}</h3>
            <p class="numbers__p">${availableState}</p>
        </div>
        <button class="numbers__btn">Apartar</button>
        `

        numbersFragment.appendChild(number)
    }

    numbersPlace.appendChild(numbersFragment)
}

export default insertNumbers