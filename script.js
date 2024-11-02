function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Código copiado al portapapeles");
        })
        .catch((error) => {
            console.error("Error al copiar el texto: ", error);
        });
}
