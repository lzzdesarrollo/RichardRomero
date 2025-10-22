document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("user-list");
  const refreshBtn = document.getElementById("refresh-btn");

  function cargarUsuarios() {
    container.innerHTML = "<p>Cargando usuarios...</p>";

    fetch("../backend/getUsers.php")
      .then(res => res.json())
      .then(users => {
        container.innerHTML = ""; // limpiar 
        users.forEach(u => {
          const card = document.createElement("div");
          card.className = "user-card";
          card.innerHTML = `
            <img src="${u.foto}" alt="${u.nombre}">
            <h3>${u.nombre}</h3>
            <p><strong>Género:</strong> ${u.genero}</p>
            <p><strong>Ubicación:</strong> ${u.ubicacion}</p>
            <p><strong>Correo:</strong> ${u.correo}</p>
            <p><strong>Nacimiento:</strong> ${u.fecha_nacimiento}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        container.innerHTML = "<p style='color:red;'>Error al cargar los usuarios.</p>";
        console.error("Error:", err);
      });
  }

  // Cargar usuarios al iniciar
  cargarUsuarios();

  // Recargar al presionar el botón
  refreshBtn.addEventListener("click", cargarUsuarios);
});
