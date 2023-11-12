//Mostrar y ocultar el carrito
$(document).ready(function () {
  $(".carrito").click(function () {
    $("#carrito-menu").toggleClass("mostrar");
    $(".overlay").toggleClass("active"); // Activa o desactiva el overlay
  });

  // Cierra el carrito cuando se hace clic en el overlay
  $(".overlay").click(function () {
    $("#carrito-menu").removeClass("mostrar");
    $(this).removeClass("active"); // Desactiva el overlay
  });
});

$(document).ready(function () {
  $(".add-to-cart-btn").click(function () {
    var productId = $(this).data("product-id");
    var kantitatea = 1; // o una cantidad seleccionada por el usuario

    console.log(productId);
    console.log(kantitatea);

    $.ajax({
      url: addToCartUrl,
      data: {
        product_id: productId,
        kantitatea: kantitatea,
        csrfmiddlewaretoken: csrf_token,
      },
      type: "POST",
      dataType: "json",
      success: function (data) {
        if (data.login == 'false'){
          window.location.href = "/login/";
        } else {    
            var html = '<div class="carrito-item" data-idproduct="' + data.produktua.id + '">' +
            '<img src="../static/img/' + data.produktua.argazkia + '" alt="' + data.produktua.izena + '" class="carrito-item-img">' +
            '<div class="carrito-item-details">' +
            '<h4 class="carrito-item-title">' + data.produktua.izena + '</h4>' +
            '<p class="carrito-item-price">' + data.produktua.prezioa + '€</p>' +
            '<div class="carrito-item-quantity">' +
            '<button class="carrito-item-decrease"><i class="bi bi-dash-circle"></i></button>' +
            '<input type="number" value="' + data.kantitatea + '" class="carrito-item-input carrito-form">' +
            '<button class="carrito-item-increase"><i class="bi bi-plus-circle"></i></button>' +
            '<button class="carrito-item-remove"><i class="bi bi-x-circle"></i></button>' +
            '</div></div></div>';

            var existingItem = $('.carrito-item[data-idproduct="' + data.produktua.id + '"]');

            if (existingItem.length > 0) {
                // Si existe, reemplaza su HTML
                existingItem.replaceWith(html);
            } else {
                // Si no existe, añade el nuevo elemento al final
                $('.carrito-items').append(html);
            }
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      },
    });
    actualizarTotalCarrito();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  
  actualizarTotalCarrito();
  // Para aumentar la cantidad
  $('.carrito-items').on('click', '.carrito-item-increase', function() {
        let input = this.parentElement.querySelector('.carrito-item-input');
        let newQuantity = parseInt(input.value) + 1;
        input.value = newQuantity;

        // Obtener el ID del producto
        let productId = this.closest('.carrito-item').getAttribute('data-idproduct');

        // Hacer la solicitud AJAX
        $.ajax({
            url: '/set_cart_kantitatea/',  // Asegúrate de que esta URL sea correcta
            method: 'POST',
            data: {
                product_id: productId,
                new_quantity: newQuantity,
                csrfmiddlewaretoken: csrf_token,
            },
            success: function(response) {
                // Actualiza la interfaz de usuario según sea necesario
            }
        });
        actualizarTotalCarrito();
    });
  // Para disminuir la cantidad
  $('.carrito-items').on('click', '.carrito-item-decrease', function() {
    let input = this.parentElement.querySelector('.carrito-item-input');
    if (input.value > 1) {
        let newQuantity = parseInt(input.value) - 1;
        input.value = newQuantity;

        // Obtener el ID del producto
        let productId = this.closest('.carrito-item').getAttribute('data-idproduct');

        // Hacer la solicitud AJAX
        $.ajax({
          url: '/set_cart_kantitatea/',  // Asegúrate de que esta URL sea correcta
          method: 'POST',
          data: {
              product_id: productId,
              new_quantity: newQuantity,
              csrfmiddlewaretoken: csrf_token,
          },
          success: function(response) {
              // Actualiza la interfaz de usuario según sea necesario
          }
      });
    }
    actualizarTotalCarrito();
  });

  
  $('.carrito-items').on('click', '.carrito-item-remove', function() {
      // Obtener el ID del producto
      let productId = this.closest('.carrito-item').getAttribute('data-idproduct');
      // Hacer la solicitud AJAX
      $.ajax({
          url: '/delete_cart_item/',  // Asegúrate de que esta URL sea correcta
          method: 'POST',
          data: {
              product_id: productId,
              csrfmiddlewaretoken: csrf_token,
          },
          success: function(response) {
              // Aquí puedes manejar la respuesta. Por ejemplo, eliminar visualmente el elemento del carrito
              if (response.success) {
                  this.closest('.carrito-item').remove();
                  actualizarTotalCarrito();
              }
          }.bind(this)  // Utilizamos '.bind(this)' para mantener la referencia correcta al botón dentro de la función success
      });
  });
});

function actualizarTotalCarrito() {
  var total = 0;

  $('.carrito-item').each(function() {
      var precio = parseFloat($(this).find('.carrito-item-price').text().replace('€', ''));
      var cantidad = parseInt($(this).find('.carrito-item-input').val());
      total += precio * cantidad;
  });

  $('.carrito-total-price').text(total.toFixed(2) + '€');
}