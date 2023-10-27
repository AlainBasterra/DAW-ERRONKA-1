$(document).ready(function () {
    // Make an AJAX request to fetch carousel content
    $.ajax({
        url: 'your-data-endpoint-url', // Replace with your data source URL
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Populate the carousel with the fetched data
            var carouselContent = $('#carousel-content');
            $.each(data, function (index, item) {
                var activeClass = index === 0 ? 'active' : ''; // First item is active
                var carouselItem = `
                    <div class="carousel-item ${activeClass}">
                        <img src="${item.image}" class="d-block w-100" alt="${item.alt}">
                        <div class="carousel-caption">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
                carouselContent.append(carouselItem);
            });
        },
        error: function () {
            // Handle errors, e.g., display a message or fallback content
        }
    });
});