const apiUrl = "https://jsonplaceholder.typicode.com/users";

const loadBtn = document.getElementById("loadBtn");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");

let users = [];

// botón cargar usuarios
loadBtn.addEventListener("click", loadUsers);

// búsqueda por filtro de usuarios
searchInput.addEventListener("input", filterUsers);

/*
PROMESAS EN JAVASCRIPT

Una promesa es un objeto que representa el resultado de una operación
asíncrona que puede completarse en el futuro.

Una promesa puede tener tres estados:

1. Pendiente (Pending) → la operación aún no ha terminado
2. Resuelta (Fulfilled) → la operación se completó correctamente
3. Rechazada (Rejected) → ocurrió un error

Las promesas se manejan normalmente usando los métodos:

.then()  → cuando la operación se completa correctamente
.catch() → cuando ocurre un error
*/


// Función que carga los usuarios desde la API
function loadUsers(){

    loader.classList.remove("hidden");
    usersContainer.innerHTML = "";

    /*
    FETCH()

    fetch() es una función de JavaScript que permite realizar
    peticiones HTTP a servidores o APIs.

    En este caso se utiliza para solicitar los datos de usuarios
    desde una API pública.

    fetch() devuelve una PROMESA, por eso podemos usar .then()
    para manejar la respuesta.
    */


    fetch(apiUrl)

        // Primer .then() recibe la respuesta del servidor
        .then(response => {

            /*
            Aquí verificamos si la respuesta del servidor fue correcta.
            Si la respuesta no es válida, lanzamos un error.
            */

            if(!response.ok){
                throw new Error("No se pudieron obtener los usuarios");
            }
            return response.json();
        })

        // Segundo .then() recibe los datos ya convertidos a JSON
        .then(data => {
            users = data;
            displayUsers(users);
            loader.classList.add("hidden");
        })

        /*
        MANEJO DE ERRORES EN JAVASCRIPT

        .catch() se utiliza para capturar cualquier error
        que ocurra durante la ejecución de la promesa.

        Esto permite evitar que la aplicación se rompa
        si ocurre un problema con la API o con la conexión.
        */

        .catch(error => {
            loader.classList.add("hidden");
            console.error("Error:", error);
        });
}

// Función que muestra los usuarios en la página
function displayUsers(userList){

    usersContainer.innerHTML = "";

    userList.forEach(user => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Ciudad:</strong> ${user.address.city}</p>
            <p><strong>Empresa:</strong> ${user.company.name}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
        `;

        usersContainer.appendChild(card);

    });
}

// Función que filtra usuarios según lo que el usuario escriba
function filterUsers(){

    const text = searchInput.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(text)
    );

    displayUsers(filtered);
}