const apikey = "4812b84b36b0749cba73f1ebcb18c5e0";
const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("submit");
const weatherDataSection = document.getElementById("weather-data");


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
    "light rain": "mưa nhẹ",

};

 
// Hàm để lấy thời tiết
function fetchWeather() {
    const city = searchBox.value;
    fetch(weatherApi + city + `,VN&appid=${apikey}`)
        .then(response => response.json())
        .then(data => {
            checkWeather(data);
        })
        .catch(() => {
            weatherDataSection.innerHTML = `<h2>Lỗi: Không thể tìm thấy thông tin thời tiết cho "${city}".</h2>`;
            weatherDataSection.style.display = "block";
        });
}

// Hàm để kiểm tra và hiển thị dữ liệu thời tiết
function checkWeather(data) {
    weatherDataSection.innerHTML = "";
    weatherDataSection.style.display = "block"; // Hiển thị thông tin thời tiết
    
    //Chuyển đổi description sang tiếng việt
    const descriptionInEnglish = data.weather[0].description.toLowerCase();
    const descriptionInVietnamese = weatherDescriptions[descriptionInEnglish] || descriptionInEnglish;


    document.getElementById("weather-data").innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
                <div>
                    <h2>${data.name}</h2>
                    <p><strong>Nhiệt độ:</strong> ${Math.round(data.main.temp * 0.1)}°C</p>
                    <p><strong>Mô tả: </strong>${descriptionInVietnamese}</p>
                </div>
            `;
    // document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    // document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    // <p><strong> Mô tả: < /strong> ${data.weather[0].description}</p>
}

// Thêm sự kiện click cho nút tìm kiếm
searchBtn.addEventListener("click", fetchWeather);
