function fetchWeather() {
    // Tạo các biến toàn cục và bắt đầu các hàm bên trong
    const searchInput = document.getElementById('search').value.trim();
    const weatherDataSection = document.getElementById("weather-data");
    const apiKey = "c0349c4060c71a096975b592958b9d61";

    // Mô tả thời tiết
    const weatherDescriptions = {
        "clear sky": "bầu trời quang đãng",
        "few clouds": "ít mây",
        "scattered clouds": "mây rải rác",
        "broken clouds": "ít mây",
        "shower rain": "mưa rào",
        "rain": "mưa",
        "thunderstorm": "giông bão",
        "snow": "tuyết",
        "mist": "sương mù",
        "overcast clouds": "u ám và có khả năng cao có mưa",
    };

    // Kiểm tra nếu ô tìm kiếm trống
    if (searchInput === "") {
        weatherDataSection.innerHTML = `
            <div>
                <h2>Ô tìm kiếm trống!</h2>
                <p>Vui lòng thử lại với tên thành phố hợp lệ.</p>
            </div>
        `;
        weatherDataSection.style.display = "block";
        return;
    }

    // Lấy tọa độ kinh độ và vĩ độ thông qua Geocoding API
    getLonAndLat(searchInput, apiKey)
        .then(geocodeData => {
            if (geocodeData) {
                // Lấy dữ liệu thời tiết nếu tọa độ hợp lệ
                return getWeatherData(geocodeData.lon, geocodeData.lat, apiKey, weatherDescriptions);
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
        });
}

// Lấy tọa độ kinh độ và vĩ độ từ tên thành phố
function getLonAndLat(searchInput, apiKey) {
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},VN&limit=1&appid=${apiKey}`;

    return fetch(geocodeURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Phản hồi không tốt! " + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById("weather-data").innerHTML = `
                    <div>
                        <h2>Đầu vào không hợp lệ: "${searchInput}"</h2>
                        <p>Vui lòng thử lại với tên thành phố hợp lệ.</p>
                    </div>
                `;
                return null; // Xử lý khi không có dữ liệu
            }
            return data[0]; // Trả về kết quả đầu tiên
        });
}

// Lấy dữ liệu thời tiết từ Current Weather API
function getWeatherData(lon, lat, apiKey, weatherDescriptions) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    return fetch(weatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Phản hồi không tốt khi lấy dữ liệu thời tiết! " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Hiển thị dữ liệu thời tiết
            const descriptionInEnglish = data.weather[0].description.toLowerCase();
            const descriptionInVietnamese = weatherDescriptions[descriptionInEnglish] || descriptionInEnglish;

            // document.getElementById("weather-data").style.display = "flex";
            document.getElementById("weather-data").innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
                <div>
                    <h2>${data.name}</h2>
                    <p><strong>Nhiệt độ:</strong> ${Math.round(data.main.temp)}°C</p>
                    <p class="weather-description"><strong>Mô tả:</strong> ${descriptionInVietnamese}</p>
                </div>
            `;
             // <p><strong>Mô tả:</strong> ${data.weather[0].description}</p>
             
            // Xóa nội dung ô tìm kiếm
            document.getElementById("search").value = "";
        });
}
