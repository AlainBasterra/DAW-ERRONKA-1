$(document).ready(function () {
    $('#login').on('submit', function (e) {
        $.ajax({
            type: 'POST',
            url:"{% url 'login_egin' %}",
            data: $(this).serialize(),
            success: function (data) {
                if (data.success){
                    alert("logina ondo dago");
                    
                }
                else{
                    alert("errorea egon da " + data.message)
                }
            }
        });
    });
});