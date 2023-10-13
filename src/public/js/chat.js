document.getElementById("message-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInputElement = document.getElementById("user");
    const messageInputElement = document.getElementById("messages");
    const messageStatusElement = document.getElementById("message-status");

    const user = userInputElement.value;
    const message = messageInputElement.value;

    try {
        const response = await fetch("/api/messages", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, message }),
        });

        if (response.ok) {
            const responseData = await response.json();
            const successMessage = responseData.message;

            
            messageStatusElement.textContent = "Mensaje enviado con éxito: " + successMessage;

           
            userInputElement.value = '';
            messageInputElement.value = '';
        } else {
            console.error('Error al enviar el mensaje');

           
            messageStatusElement.textContent = "Error al enviar el mensaje";
        }
    } catch (error) {
        console.error('Error de red:', error);

        
        messageStatusElement.textContent = "Error de red. Inténtelo de nuevo.";
    }
});
