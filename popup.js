// Guardar la página actual
document.getElementById("btnSave").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("Guardando favorito:", tab);
    console.log("URL de la pestaña activa:", tab.url);
    const favorite = { direccionurl: tab.url }; // usar "URL" en mayúsculas
    console.log("Favorito a guardar:", favorite);

    try {
        const response = await fetch("http://localhost:8080/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite)
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("msg").textContent =
                `Guardado: ${data.direccionurl} (id: ${data.id})`;
        } else {
            document.getElementById("msg").textContent = "Error al guardar";
        }
    } catch (error) {
        document.getElementById("msg").textContent = "No se pudo conectar al backend";
        console.error(error);
    }
});

// Mostrar favoritos guardados
document.getElementById("btnShow").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:8080/api/favorites");
        if (response.ok) {
            const favorites = await response.json();

            const list = favorites.map(fav =>
                `<li>ID: ${fav.id} | URL: ${fav.direccionurl} | Descripción: ${fav.descripcion}</li>`
            ).join("");
            document.getElementById("favoritesList").innerHTML = list;
        } else {
            document.getElementById("msg").textContent = "Error al cargar favoritos";
        }
    } catch (error) {
        document.getElementById("msg").textContent = "No se pudo conectar al backend";
        console.error(error);
    }
});
