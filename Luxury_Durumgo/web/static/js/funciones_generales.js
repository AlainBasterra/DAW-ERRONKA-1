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
        console.log(data);
        // if (data.items_count) {
        //   // Actualizar la cantidad de ítems en el carrito en el DOM
        //   $("#cart-items-count").text(data.items_count);
        // }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      },
    });

  });
});
