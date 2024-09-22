const URL_SERVER = 'http://localhost:3000'; // Define la URL del servidor aquí

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const params_transaction = {
                name: "New Checkout",
                invoice: "prueba 124",
                description: "Nueva implementacion de seguridad",
                currency: "cop",
                amount: "20000",
                country: "CO",
                test: "true",
                ip: "186.97.212.162"
            };
            fetch(`${URL_SERVER}/session`, {
                method: "POST",
                body: JSON.stringify(params_transaction),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(({ sessionId }) => {
                const handler = ePayco.checkout.configure({
                    sessionId,
                    external: false // external: true -> para checkout externo ó External: false => para iframe onePage
                });
                // Abrir checkout
                handler.openNew();
            })
            .catch(error => console.log('Error en fetch:', error));
        });
    } else {
        console.error('El botón de checkout no se encontró en el DOM.');
    }
});