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

    
      var checkIcon = $(this).siblings('.bi-check'); // Encuentra el ícono de verificación hermano
      checkIcon.removeClass('d-none'); // Muestra el ícono

      setTimeout(function() {
          checkIcon.addClass('d-none'); // Oculta el ícono después de 2 segundos
      }, 2000); // 2000 milisegundos = 2 segundos

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
          actualizarTotalCarrito();
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

      if (isNaN(cantidad) || cantidad < 1) {
        input.val(1);
        cantidad = 1;
    }
    total += precio * cantidad;  
  });

  $('.carrito-total-price').text(total.toFixed(2) + '€');
}

$(document).ready(function() {
  $('.carrito-items').on('input', '.carrito-item-input', function() {
      let valorActual = parseInt($(this).val());
      console.log(valorActual);
      if (valorActual < 1) {
          $(this).val(1);
      }
      if (!isNaN(valorActual)) {
        actualizarTotalCarrito();
    }
  });
});



// FUNCIONES PARA EL CHECKOUT

//CALCULA EL TOTAL CON LOS PRECIOS DE LOS PRODUCTOS
$(document).ready(function() {
  calcularTotal();
});

function calcularSubtotales() {
  
  $('.discont-amount').text("--");
  var totalProductos = 0;

  document.querySelectorAll('.checkout-item').forEach(function(item) {
      var precio = parseFloat(item.querySelector('.precio-unitario').textContent.replace('€', ''));
      var inputCantidad = item.querySelector('.carrito-item-input');
      var cantidad = parseInt(inputCantidad.value);

      if (cantidad < 1) {
          cantidad = 1;
          inputCantidad.value = cantidad;
      } else if (cantidad > 50) {
          cantidad = 50;
          inputCantidad.value = cantidad;
      }

      var subtotal = precio * cantidad;
      if (isNaN(subtotal)) {
          subtotal = 0;
      }

      // Suma el subtotal al total de productos
      totalProductos += subtotal;

      // Actualizar el subtotal en la fila
      item.querySelector('.subtotal').textContent = subtotal.toFixed(2) + '€';

      // Realizar la solicitud AJAX
      let productId = item.getAttribute('data-idproduct');
      $.ajax({
          url: '/set_cart_kantitatea/',
          method: 'POST',
          data: {
              product_id: productId,
              new_quantity: cantidad,
              csrfmiddlewaretoken: csrf_token,
          },
          success: function(response) {
              // Manejar la respuesta si es necesario
          }
      });
  });

  // Actualizar el subtotal de los productos en el HTML
  document.querySelector('.products-subtotal').textContent = totalProductos.toFixed(2) + '€';

  // Llamar a calcularTotal aquí para actualizar el total general
  calcularTotal();
}

function calcularTotal() {
  var totalProductos = 0;
  document.querySelectorAll('.checkout-item').forEach(function(item) {
      var subtotal = parseFloat(item.querySelector('.subtotal').textContent.replace('€', ''));
      if (!isNaN(subtotal) && subtotal > 0) {
          totalProductos += subtotal;
      }
  });

  var precioEnvioTexto = document.querySelector('.delivery-fee').textContent;
  var precioEnvioNumerico = parseFloat(precioEnvioTexto.replace('€', ''));
  
  var precioEnvio = !isNaN(precioEnvioNumerico) ? precioEnvioNumerico : 0;

  var descuentoTexto = document.querySelector('.discont-amount').textContent;
  var valorDescuento = 0;
  if (descuentoTexto !== '--') {
      if (descuentoTexto.includes('%')) {
          var porcentajeDescuento = parseFloat(descuentoTexto.replace('%', ''));
          valorDescuento = totalProductos * (porcentajeDescuento / 100);
      } else if (descuentoTexto.includes('€')) {
          valorDescuento = parseFloat(descuentoTexto.replace('€', ''));
      }
  }

  if (isNaN(valorDescuento)) {
      valorDescuento = 0;
  }

  var total = (totalProductos + precioEnvio) - valorDescuento;
  document.querySelector('.p-total').textContent = total.toFixed(2) + '€';
}

// Eventos DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  calcularSubtotales();

  document.querySelectorAll('.carrito-item-input').forEach(function(input) {
      input.addEventListener('input', calcularSubtotales);

  });
});


// SUMAR, RESTAR Y ELIMINAR EN EL CHECKOUT
document.addEventListener('DOMContentLoaded', function() {
  $('.discont-amount').text("--");
  // Para aumentar la cantidad
  $('.checkout-item').on('click', '.carrito-item-increase', function() {
        let input = this.parentElement.querySelector('.carrito-item-input');
        let newQuantity = parseInt(input.value) + 1;
        input.value = newQuantity;

        // Obtener el ID del producto
        let productId = this.closest('.checkout-item').getAttribute('data-idproduct');

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
        calcularSubtotales();
        
    });
  // Para disminuir la cantidad
  $('.checkout-item').on('click', '.carrito-item-decrease', function() {
    $('.discont-amount').text("--");
    let input = this.parentElement.querySelector('.carrito-item-input');
    if (input.value > 1) {
        let newQuantity = parseInt(input.value) - 1;
        input.value = newQuantity;

        // Obtener el ID del producto
        let productId = this.closest('.checkout-item').getAttribute('data-idproduct');

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
    calcularSubtotales();
  });

  
  $('.checkout-item').on('click', '.carrito-item-remove', function() {
    $('.discont-amount').text("--");
      // Obtener el ID del producto
      let productId = this.closest('.checkout-item').getAttribute('data-idproduct');
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
                  this.closest('.checkout-item').remove();
                  calcularSubtotales();
              }
          }.bind(this)  // Utilizamos '.bind(this)' para mantener la referencia correcta al botón dentro de la función success
      });
  });
});


//CALCULAR PRECIO DELIVERY
$(document).ready(function() {
  $('#delivery-form').on('submit', function(e) {
      e.preventDefault(); // Prevenir el envío normal del formulario
      $('.discont-amount').text("--");
      // Mostrar el spinner
      $('.spinner-border').removeClass('d-none');

    $.ajax({
        url: '/calc_delivery/',
        method: 'POST',
        data: $(this).serialize() + '&csrfmiddlewaretoken=' + csrf_token,
        success: function(response) {
          if (response.error && response.error === 'False') {
              // Actualiza el precio de envío
              $('.delivery-fee').text(response.price);
              calcularTotal();
              // Calcula y actualiza el total
              // var totalProductos = calcularTotal();
              // var precioEnvio = parseFloat(response.price.replace('€', '').trim());
              // var total = totalProductos + precioEnvio;
              // $('.p-total').text(total.toFixed(2) + '€');
          } else {
            alert("Delivery address is not valid or too far away");
          }
  
          $('.spinner-border').addClass('d-none'); // Oculta el spinner
      },
        error: function() {
            alert("Delivery address is not valid or too far away. Max distance: 6000km");
            $('.spinner-border').addClass('d-none');
        }
    });
    
  
  });
});

$(document).ready(function() {
  $('#discount-form').on('submit', function(e) {
      e.preventDefault(); // Prevenir el envío normal del formulario

      
      var descuentoTexto = document.querySelector('.discont-amount').textContent;
      if(descuentoTexto != "--") {
        alert('A discount has already been applied');
        return;
      }

      var deliveryPrice = $('.delivery-fee').text();
      if(deliveryPrice == '--') {
        alert('First calculate the delivery price');
        return;
      }


    $.ajax({
        url: '/calc_discount/',
        method: 'POST',
        data: $(this).serialize() + '&csrfmiddlewaretoken=' + csrf_token,
        success: function(response) {
          if (response.error && response.error === 'False') {
            $('.discont-amount').text(response.deskontua);
              // Comprobar si el descuento es un porcentaje o un valor fijo
              var totalOriginal = parseFloat($('.p-total').text().replace('€', '').trim());
              var descuento = 0;
              if(response.deskontua.includes('%')) {
                  var porcentajeDescuento = parseFloat(response.deskontua.replace('%', '').trim());
                  descuento = totalOriginal * (porcentajeDescuento / 100);
              } else {
                  descuento = parseFloat(response.deskontua.replace('€', '').trim());
              }

              // Aplicar el descuento al total original
              var totalConDescuento = totalOriginal - descuento;

              // Actualizar el total en la interfaz de usuario
              $('.p-total').text(totalConDescuento.toFixed(2) + '€');
              descuentoAplicado = true;
          } else if (response.error && response.error === 'True') {
              alert('Discount code is not valid');
          }
      },
        error: function() {
          alert('Discount code is not valid');
        }
    });
    
  
  });calcularTotal();
});


//CALCULAR PRECIO DELIVERY
$(document).ready(function() {
  $('.end-checkout-btn').on('click', function(e) {
      e.preventDefault();
      var total = document.querySelector('.p-total').textContent;
      var name = document.querySelector('#name').value;
      var city = document.querySelector('#city').value;
      var postal_code = document.querySelector('#postal-code').value;
      var address = document.querySelector('#address').value;
      var additionalInfo = document.querySelector('#additionalInfo').value;

    $.ajax({
        url: '/end_checkout/',
        method: 'POST',
        data: {
          total: total,
          name: name,
          city: city,
          postal_code: postal_code,
          address: address,
          additionalInfo: additionalInfo,
          csrfmiddlewaretoken: csrf_token,
        },
        success: function(response) {
          console.log(response);
          if (response.error && response.error === 'False') {
            alert('Order completed successfully');
            window.location.href = "/"; // Redirigir a la página de inicio
          } else {
            alert('Error completing order');
          }
      },
        error: function() {
        }
    });
    
  
  });
});