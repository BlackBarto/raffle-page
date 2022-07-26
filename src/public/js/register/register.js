const $form = document.getElementById("form")
const $submitBtn = document.getElementById("submit-btn")
const invalidForName = /\D/
const invalidForEmail = /\s/
const invalidForAll = /\W|\/|\\/

$form.addEventListener("submit", (e) => {
    const formData = new FormData($form)
    const objData = Object.fromEntries(formData)
    const { name, email } = objData

    if (!name || !email || invalidForAll.test(name) || invalidForAll.test(email) || invalidForName.test(name) || invalidForEmail.test(email)) {
        e.preventDefault()
    }

    $submitBtn.classList.add("active")
})

setTimeout(() => {
    console.log("Estas tardando mucho")
}, 1000 * 60 * 30)


