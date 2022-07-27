const $form = document.getElementById("form")
const $submitBtn = document.getElementById("submit-btn")
const invalidForName = /\d/
const invalidForEmail = /\s/
const invalidForAll = /\/|\\/

$form.addEventListener("submit", (e) => {
    const formData = new FormData($form)
    const objData = Object.fromEntries(formData)
    const { name, email } = objData

    console.log({name, email})

    if (!name || !email || invalidForAll.test(name) || invalidForAll.test(email) || invalidForName.test(name) || invalidForEmail.test(email)) {
        e.preventDefault()
        return
    }

    $submitBtn.classList.add("active")
})

setTimeout(() => {
    console.log("Estas tardando mucho")
}, 1000 * 60 * 30)


