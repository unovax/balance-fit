
function getFormData(data) {
    const formData = new FormData();

    // Iterar sobre las keys del objeto data
    for (const key in data) {
        // Verificar si la propiedad realmente pertenece al objeto y no a la cadena de prototipo
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];

            // Si el valor es un archivo (por ejemplo, 'img'), añadirlo al FormData
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                // Si no es un archivo, convertir el valor a cadena y añadirlo al FormData
                formData.append(key, String(value));
            }
        }
    }

    // Añadir el método '_method' con valor 'PUT'
    formData.append('_method', 'PUT');

    return formData;
}

export default getFormData;