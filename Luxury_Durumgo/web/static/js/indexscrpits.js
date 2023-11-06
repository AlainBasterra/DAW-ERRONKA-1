$(document).ready(function () {
    // Make an AJAX request to fetch carousel content
    var url = "../static/json/argazkiak.json"; // Replace with your data source URL
    var perfilDiv = document.getElementById("user");
    var izena = perfilDiv.getAttribute("data-izena");

    if (izena) {
        // Si el usuario está logeado, muestra la foto de perfil y el nombre de usuario
        var user = '<li class="nav-item dropdown">';
        user +=
            '<a class="nav-link dropdown-toggle" href="#"id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + izena + ' <img src = "../static/img/user.png "> <span class="sr-only">(current)</span></a>';
        user += '<div class="dropdown-menu" aria-labelledby="navbarDropdown">';
        user += '<a class="dropdown-item" href="#">Profile</a>';
        user += '<a class="dropdown-item" href="logout/">Log out</a>';

        perfilDiv.innerHTML = user;
    } else {
        var login = '<li class="nav-item"></li>';
        login += '<a class="nav-link" href="login/">Login</a>';
        login += "</li>";
        login += '<li class="nav-item">';
        login += `<a class="nav-link" href="register/">Register</a>`;
        login += "</li>";
        perfilDiv.innerHTML = login;
    }

    $.ajax({
        method: "GET",
        url: url,
        success: function (data) {
            // Populate the carousel with the fetched data
            var carouselContent = "#carousel-content";

            $.each(data, function (index, item) {
                var activeClass = index === 0 ? "active" : "";
                var carouselItem = '<div class= "carousel-item ' + activeClass + '">';

                carouselItem += '<img src="../static/img/' + item.image + '">';

                // First item is active

                carouselItem += "</div>";

                $(carouselContent).append(carouselItem);
            });
        },
        error: function () {
            // Handle errors, e.g., display a message or fallback content
        },
    });
});


<<<<<<< Updated upstream
=======
 // Simula si el usuario está logeado o no
 var usuarioLogeado = false;

 // Función para mostrar el perfil del usuario
 function mostrarPerfil() {
    var perfilDiv = document.getElementById('user');
    perfilDiv.innerHTML = ''; // Limpia cualquier contenido anterior

     if (usuarioLogeado) {

         // Si el usuario está logeado, muestra la foto de perfil y el nombre de usuario
         var user = '<li class="nav-item dropdown">';
         user += '<a class="nav-link dropdown-toggle" href="#"id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{izena}} <img src = "../static/img/user.png "> <span class="sr-only">(current)</span></a>';
         user += '<div class="dropdown-menu" aria-labelledby="navbarDropdown">';
         user += '<a class="dropdown-item" href="#">Profile</a>';
         user += '<a class="dropdown-item" href="#">Log out</a>';


         perfilDiv.appendChild(user);
     }
     else{
        var login = '<li class="nav-item"></li>';
        login += `<a class="nav-link" href="{% url 'login' %}">Login</a>`;
        login += '</li>';
        login += '<li class="nav-item">';
        login += `<a class="nav-link" href="#">Register</a>`;
        login += '</li>';
        perfilDiv.appendChild(login);
     }
 }

 // Función que verifica si un elemento está en el área visible
 function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para manejar el desplazamiento y mostrar las imágenes
function handleScroll() {
    const images = document.querySelectorAll(".appear-on-scroll");
    if (images) {
        images.forEach(function (image) {
            if (isElementInViewport(image) && !image.classList.contains("appeared")) {
                image.classList.add("appeared");
            }
        });
    }
}

// Escucha el evento 'scroll' y llama a la función handleScroll
window.addEventListener("scroll", handleScroll);

// Llama a handleScroll una vez al cargar la página
handleScroll();
>>>>>>> Stashed changes
