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
  $(".add-to-cart-btn").click(function (e) {
    e.preventdefault();
    var productId = $(this).data("product-id");
    var cantidad = 1; // o una cantidad seleccionada por el usuario

    $.ajax({
      url: "{% url 'add_to_cart' %}",
      data: {
        product_id: productId,
        cantidad: cantidad,
        csrfmiddlewaretoken: "{{ csrf_token }}",
      },
      type: "POST",
      dataType: "json",
      success: function (data) {
        if (data.items_count) {
          // Actualizar la cantidad de ítems en el carrito en el DOM
          $("#cart-items-count").text(data.items_count);
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      },
    });
  });
});
