// Detect user location (Geolocation + reverse geocode)
window.onload = function() {
    const citySpan = document.getElementById("city");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        citySpan.textContent = "Geolocation not supported.";
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Reverse geocoding API (OpenStreetMap)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || "Unknown";
                citySpan.textContent = city;
            })
            .catch(() => citySpan.textContent = "Location not found");
    }

    function error() {
        citySpan.textContent = "Unable to get location.";
    }
};