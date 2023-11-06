$(document).ready(function () {
    $('#login').on('submit', function (e) {
        var url = "login_egin/";
        e.preventDefault();
        
        $.ajax({
            type: 'POST',
            
            url:url,
            data: $(this).serialize(),
            success: function (data) {
                if (data.success){
                    alert("logina ondo dago");
                    
                    window.location.href = data.redirect_url;
                    
                }
                else{
                    alert("errorea egon da " + data.message)
                }
            }
        });
    });
});