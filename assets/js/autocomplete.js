// Auto complete function - using the google maps autocomplete API
function autoComplete() {
    var autocomplete = new google.maps.places.Autocomplete(searchInput,
        {
            types: ['(cities)']
        }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        nameOfCity = place.name;
        if (!place.address_components) {
            return;
        }
        if (place.address_components) {
            googleCountryShortName = place.address_components[2]["short_name"];
        }
        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested 
            return;
        }
        if (place.geometry || place.geometry.location) {
            latitude = place.geometry.location.lat();
            longitude = place.geometry.location.lng();
        }
    });
}
google.maps.event.addDomListener(window, 'load', autoComplete);