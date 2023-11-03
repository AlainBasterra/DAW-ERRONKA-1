$(document).ready(function () {
    $('#login').on('submit', function (e) {
        var url = "login_egin/";
        e.preventDefault();
        //let csrftoken = '{{ csrf_token }}'
        $.ajax({
            type: 'POST',
            //headers:{'X-CSRFToken':csrftoken},
            url:url,
            data: $(this).serialize(),
            success: function (data) {
                if (data.success){
                    alert("logina ondo dago");
                    usuarioLogeado = true;
                    window.location.href = data.redirect_url;
                    mostrarusuario(usuarioLogeado);
                }
                else{
                    alert("errorea egon da " + data.message)
                }
            }
        });
    });
});