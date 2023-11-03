

$(document).ready(function () {
    // Make an AJAX request to fetch carousel content
    var url = '../static/json/argazkiak.json'; // Replace with your data source URL
    $.ajax({
        
        method: 'GET',
        url:url,
        success: function (data) {
            // Populate the carousel with the fetched data
            var carouselContent = '#carousel-content';
            
            $.each(data, function (index,item) {
            var activeClass = index === 0 ? 'active' : '';
            var carouselItem ='<div class= "carousel-item ' + activeClass + '">';
                    
                        carouselItem += '<img src="../static/img/'+ item.image + '">';
                    
                    
                
                 // First item is active
                
                    
                    carouselItem += '</div>';  

                $(carouselContent).append(carouselItem);
            
            });
        },
        error: function () {
            // Handle errors, e.g., display a message or fallback content
        }
    });
});


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