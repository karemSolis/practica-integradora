document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('username-form').addEventListener('submit', async (e) => {
        e.preventDefault();
    const form = document.getElementById('username-form');
    const userInput = document.getElementById('username');
    const messageInput = document.getElementById('messages');
    const successMessageDiv = document.getElementById('success-message');
    const errorMessageDiv = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = userInput.value;
        const message = messageInput.value;


        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, message }),
            });

            if (response.ok) {
                // Manejar la respuesta exitosa
                const responseData = await response.json();
                const successMessage = responseData.message;

                successMessageDiv.textContent = successMessage;
                errorMessageDiv.textContent = '';

                userInput.value = '';
                messageInput.value = '';
            } else {

                errorMessageDiv.textContent = 'Error al enviar el mensaje';
                successMessageDiv.textContent = '';
            }
        } catch (error) {

            console.error('Error de red:', error);

            errorMessageDiv.textContent = 'Error de red. Inténtelo de nuevo.';
            successMessageDiv.textContent = '';
        }
    });
})})