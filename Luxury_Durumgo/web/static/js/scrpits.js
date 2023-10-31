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