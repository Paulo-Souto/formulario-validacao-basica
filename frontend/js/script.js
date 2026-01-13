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
console.log(hasErrors()); //Será apagado na branch junto com app.py
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
            //form.reset(); //alterado na branch junto com app.py
            fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nameInput.value,
                    email: emailInput.value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    form.reset();
                    formWasSubmitted = false;
                } else {
                    messageError.textContent = data.message;
                    messageError.classList.remove("hidden");
                }
            })
            .catch(error => {
                console.error(error);
                messageError.textContent = "Erro ao conectar com o servidor.";
                messageError.classList.remove("hidden");
            })
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