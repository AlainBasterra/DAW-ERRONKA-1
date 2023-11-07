//Mostrar y ocultar el carrito
$(document).ready(function() {
    $('.carrito').click(function() {
      $('#carrito-menu').toggleClass('mostrar');
      $('.overlay').toggleClass('active'); // Activa o desactiva el overlay
    });
  
    // Cierra el carrito cuando se hace clic en el overlay
    $('.overlay').click(function() {
      $('#carrito-menu').removeClass('mostrar');
      $(this).removeClass('active'); // Desactiva el overlay
    });
  });
  