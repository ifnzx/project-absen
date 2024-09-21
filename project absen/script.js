// Function to get GPS location
function getLocation() {
    const locationStatus = document.getElementById('location-status');
    const coordinates = document.getElementById('coordinates');

    if (navigator.geolocation) {
        locationStatus.textContent = "Mengambil lokasi...";
        
        // Ambil lokasi GPS dengan timeout dan error handling yang lebih baik
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                coordinates.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
                locationStatus.textContent = "Lokasi berhasil diambil!";
                console.log(`Koordinat berhasil: Latitude ${lat}, Longitude ${lon}`);
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        locationStatus.textContent = "Izin lokasi ditolak.";
                        console.error("Error: Izin lokasi ditolak.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationStatus.textContent = "Lokasi tidak tersedia.";
                        console.error("Error: Lokasi tidak tersedia.");
                        break;
                    case error.TIMEOUT:
                        locationStatus.textContent = "Permintaan lokasi timeout.";
                        console.error("Error: Permintaan lokasi timeout.");
                        break;
                    default:
                        locationStatus.textContent = "Terjadi kesalahan dalam mendapatkan lokasi.";
                        console.error("Error: Terjadi kesalahan yang tidak diketahui.");
                        break;
                }
            },
            {
                enableHighAccuracy: true, // Menggunakan akurasi tinggi jika tersedia
                timeout: 10000, // Timeout setelah 10 detik
                maximumAge: 0 // Tidak menggunakan cache
            }
        );
    } else {
        locationStatus.textContent = "Geolocation tidak didukung oleh browser ini.";
        console.error("Error: Geolocation tidak didukung oleh browser ini.");
    }
}
