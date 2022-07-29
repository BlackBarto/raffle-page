export const messagesPlace = document.getElementById("messages")

export default function showMessage({selector, fatherElement, timeOfAnimation = 500}) {
    const elements = document.querySelectorAll(selector)

    elements.forEach((element, i) => {
        setTimeout(() => {
            const time = 5000 + i * 2000
            element.classList.add("active")
            setTimeout(() => { element.classList.remove("active") }, time)

            setTimeout(() => {
                if(fatherElement.contains(element) && fatherElement !== element) fatherElement.removeChild(element)
            }, time + timeOfAnimation)
        }, i * 700)
    })
}

messagesPlace.addEventListener("click", e => {
    const parentElement = e.target.parentNode.parentNode
    const { type } = e.target.dataset
    if (type && type === "close-message") {
        messagesPlace.removeChild(parentElement)
    }
})
