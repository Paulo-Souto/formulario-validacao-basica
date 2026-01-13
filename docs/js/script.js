document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageError = document.getElementById("message-error");
    const submitButton = form.querySelector("button[type='submit']");

    const API_URL = "https://formulario-validacao-basica.onrender.com";

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

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        formWasSubmitted = true;

        validateForm();

        if (hasErrors() === true) {
            messageError.classList.remove("hidden");
        } else {
            messageError.classList.add("hidden");

            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";

            fetch(`${API_URL}/submit`, {
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
            .catch(() => {
                messageError.textContent = "Erro ao conectar com o servidor.";
                messageError.classList.remove("hidden");
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Enviar";
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