document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form")
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const messageError = document.getElementById("message-error")

    let formWasSubmitted = false;

    function validateField(input) {
        if (input.value.trim() === "") {
            input.classList.add("input-error");
        } else {
            input.classList.remove("input-error");
        }
    }

    function validateForm() {
        validateField(nameInput);
        validateField(emailInput);
    }

    function hasErrors() {
        return (
            nameInput.classList.contains("input-error") || emailInput.classList.contains("input-error")
        );
    }
console.log(hasErrors());
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        formWasSubmitted = true;

        validateForm();

        if (hasErrors() === true) {
            messageError.classList.remove("hidden");
            console.log("message-error");
        } else {
            messageError.classList.add("hidden");
            alert("Formulário enviado com sucesso!");
        }
    });

    [nameInput, emailInput].forEach(input => {
        input.addEventListener("blur", () => {
            if (formWasSubmitted) {
                validateField(input);

                if (!hasErrors()) {
                    messageError.classList.add("hidden");
                }
            }
        });
    });
});