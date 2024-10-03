Xem thời tiết bằng HTML, CSS và JavaScript
Điều kiện tiên quyết: HTML/CSS, JavaScript
Phiên bản: HTML5, CSS3, ES6+ (JavaScript)

# Giới thiệu
Bạn có bao giờ tự hỏi tại sao một số ứng dụng và trang web cho phép bạn kiểm tra thời tiết không?

Trong hướng dẫn này, chúng ta sẽ xây dựng một ứng dụng web hiển thị thời tiết hiện tại bằng cách sử dụng HTML, CSS, JavaScript và một thành phần đặc biệt... API!

Với sức mạnh của Open Weather và một chút phép thuật mã hóa, chúng ta có thể kiểm tra dự báo thời tiết tại địa phương.

Đến cuối hướng dẫn này, bạn sẽ học được cách:

Lấy dữ liệu không đồng bộ bằng khóa API.
Tổ chức nội dung bằng mô hình bố cục CSS.
Thay đổi nội dung trên trang được hiển thị.
Ứng dụng thời tiết hoàn chỉnh sẽ trông và hoạt động như thế này:

Hoàn thành ứng dụng thời tiết

Chúng ta hãy bắt đầu nhé!

# Bước 1: Thiết lập dự án
Đầu tiên, chúng ta cần tạo các thư mục và tệp sẽ chứa mã cho dự án của mình. Hãy bắt đầu bằng cách mở terminal và tạo một thư mục mới có tên weather-app bằng mkdirlệnh. Sau đó, vào thư mục này bằng cdlệnh:

mkdir weather-app
cd weather-app
touch index.html styles.css script.js

Thao tác này sẽ tạo các tệp sau trong thư mục weather-app :

Tệp index.html để hiển thị ứng dụng.
Tệp styles.css để tùy chỉnh giao diện cho ứng dụng của chúng tôi.
Tệp script.js nơi chúng ta sẽ lấy dữ liệu thời tiết.
Chúng ta sẽ quay lại các tệp này sau. Nhưng bây giờ, hãy chuyển sang OpenWeather!

# Bước 2: Nhận Khóa API Từ OpenWeather
OpenWeather cung cấp một số API (hoặc giao diện lập trình ứng dụng) để lấy dữ liệu liên quan đến thời tiết.

Nếu bạn chưa tạo, bạn phải tạo tài khoản OpenWeather với tên người dùng, email và mật khẩu:

Biểu mẫu cho tài khoản mới với OpenWeather

Lưu ý: Bạn sẽ nhận được email xác minh; hãy nhớ trả lời nhé!

Tiếp theo, bạn sẽ được nhắc nêu rõ bạn muốn làm gì với API của OpenWeather.

Yêu cầu của OpenWeather (sau khi đăng nhập)

Tôi khuyên bạn nên chọn "Giáo dục/Khoa học" hoặc "Khác".

Bây giờ bạn đã sẵn sàng để xem khóa API của mình! Sau khi tạo tài khoản mới, một khóa mới sẽ được tạo cho bạn. Gần góc trên bên phải, chọn tên người dùng của bạn, sau đó chọn "Khóa API của tôi" trong danh sách thả xuống:

Màn hình tạo khóa mới cho API OpenWeather

Sau khi xác nhận bạn có khóa API đang hoạt động, hãy chuyển sang bước tiếp theo!

# Bước 3: Viết HTML
Đã đến lúc bắt đầu viết mã!

Hãy quay lại trình soạn thảo mã và mở lại tệp index.html .

Thêm mã HTML sau để bắt đầu:

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link href="styles.css" rel="stylesheet" />
    <title>Weather App</title>
    </head>
    <body>
    
    </body>
    </html>

    Ngoài phần <!DOCTYPE html>khai báo cần thiết, chúng tôi đã đưa vào một <link>phần tử để <head>kết nối HTML với tệp styles.css (chúng tôi sẽ xử lý phần tử này ở bước tiếp theo).

    Tiếp theo, hãy thêm mã HTML sau vào bên trong <body>phần tử:

    <body>
    <main>
        <section id="weather-wrapper">
        <h1>Weather App</h1>
        <div id="weather-search">
            <input id="search" type="text" placeholder="Search by city" />
            <input id="submit" type="submit" onclick="fetchWeather()" value="Search" />
        </div>
        <div id="weather-data" style="display: none;"></div>
        </section>
    </main>
    <script src="script.js"></script>
    </body>
```
Phần tử này \<main></main> chứa toàn bộ cấu trúc ứng dụng của chúng tôi và bao gồm một <section>phần tử có nội dung sau:

Một \<h1>phần tử tiêu đề.
Một \<div>phần tử có hai \<input>phần tử để tìm kiếm thời tiết theo thành phố.
Phần còn lại \<div>hiện đang trống, nhưng sẽ được điền dữ liệu trả về bởi hàm fetchWeather()mà chúng ta sẽ viết sau.
Chúng tôi cũng đã thêm một \<script>phần tử để kết nối HTML với tệp script.js .

Lưu ý: Phần \<script>tử được viết trước \</body>thẻ đóng để đảm bảo toàn bộ HTML được tải và JavaScript có thể truy cập được.

Nếu chúng ta lưu tệp index.html và mở nó trên trình duyệt, nó sẽ trông như thế này:

Ứng dụng thời tiết được kết xuất (chỉ HTML)

Hiện tại trông khá thô sơ. Nhưng đừng lo! Chúng tôi sẽ xử lý vấn đề đó ở bước tiếp theo.

# Bước 4: Viết CSS
Hãy thêm một chút thú vị cho ứng dụng thời tiết của chúng ta bằng cách tạo kiểu cho nó bằng CSS!

Trong phần lớn bước này, chúng ta sẽ sử dụng CSS thuần túy. Tuy nhiên, chúng ta cũng sẽ sử dụng một mô hình bố cục thú vị cho CSS có tên là Flexbox để giúp sắp xếp nội dung ứng dụng của chúng ta.

Bên trong tệp styles.css , chúng ta hãy bắt đầu bằng cách thêm nội dung sau:
```
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
    background-image: url(https://bit.ly/4bcK1Hc);
    background-repeat: no-repeat;
    background-size: cover;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    height: 100vh;
    }
```
Sau đây là những gì chúng tôi đã làm trong đoạn trích trên:

Đầu tiên, chúng ta chọn mọi thứ (tức là *), đặt mặc định marginvà paddingbằng 0, và phân tích paddingvà borderthành kích thước phần tử với box-sizing: border-box.
Sau đó, chúng ta sẽ tạo bodychiều cao bằng màn hình mà nó được hiển thị bằng 100vh. Chúng ta cũng sẽ thiết lập font-familythông tin của nó bằng sans-serifphông chữ mặc định.
Cuối cùng, chúng ta thiết lập a background-imagebằng cách truyền liên kết hình ảnh của Brooklyn (nơi Codédex đặt trụ sở) đến url()hàm. Tuy nhiên, bạn có thể thoải mái sử dụng hình ảnh của riêng mình!
Tiếp theo, chúng ta sẽ chọn <main>phần tử và thêm các kiểu sau:

```
    main {
    background-color: rgba(227, 193, 173, 0.85);
    position: relative;
    top: 30%;
    border: 1px solid;
    border-radius: 5px;
    min-width: 540px;
    max-width: 50%;
    margin: auto;
    padding: 2em;
    }

    h1 {
    margin-bottom: 20px;
    }
```
Chúng tôi đã tạo kiểu <main>cho phần tử như sau:

Chúng tôi đã thêm background-colorgiá trị RGB, cũng như giá trị thứ tư giúp phần tử này "trong suốt" 85%.
Nó được đặt ở một vị trí cách màn hình relative30% .top
Một số thiết lập lớp hộp đã được thêm vào, bao gồm border, border-radius, và padding.
Chúng tôi đặt kích thước min-widthlà 540px và max-width50%.
Vì \<main>phần tử này là phần tử khối nên chúng ta căn giữa nó bằng margin: auto.
Cuối cùng, chúng tôi thêm một khoảng trống bên dưới h1phần tử bằng margin-bottom.

Hãy lưu tệp styles.css của chúng ta . Tại thời điểm này, ứng dụng thời tiết được kết xuất của chúng ta sẽ trông như thế này:

Ứng dụng được kết xuất bằng một số CSS

Bây giờ, hãy làm cho \<input>các phần tử xuất hiện lớn hơn để phù hợp hơn với \<h1>tiêu đề phía trên chúng. Chọn các phần tử này bằng #searchvà #submit, và thêm nội dung sau:

```
    #search {
    border-radius: 5px 0 0 5px;
    border: none;
    padding: 10px;
    font-size: 16px;
    width: 70%;
    height: 42px;
    }

    #submit {
    border-radius: 0 5px 5px 0;
    padding: 10px;
    font-size: 16px;
    width: 5em;
    cursor: pointer;
    }
```
Cả hai phần tử này đều có cùng kiểu cho paddingvà font-size.

Phần tử này #searchđạt 70% width, cũng như a heightvà 42pxkhông border.

Phần tử này #submitcó thuộc widthtính 5em, cùng với cursor: pointerkiểu dáng khiến mũi tên biến thành hình bàn tay trỏ khi di chuột qua phần tử này.

Hãy lưu styles.css và hiển thị lại trang:

Ứng dụng được kết xuất với nhiều CSS được thêm vào

Tiếp theo, chúng ta sẽ áp dụng một số CSS Flexbox để dễ dàng căn giữa nội dung trong ứng dụng thời tiết.

Chọn các phần tử #weather-wrappervà #weather-search, sau đó thêm nội dung sau:
```
    #weather-wrapper {
    display: flex;
    }

    #weather-search {
    display: flex;
    }
```
Điều này biến các phần tử #weather-wrappervà #weather-searchthành các vùng chứa flex. Do đó, các phần tử con của chúng trở thành các mục flex mà chúng ta có thể căn chỉnh với các thuộc tính nhất định.

Cập nhật các thành phần này như sau:
```
    #weather-wrapper {
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: space-between;
    }

    #weather-search {
    display: flex;
    width: 50%;
    }
```
Theo mặc định, các mục flex được hiển thị theo hàng. Nhưng chúng tôi đã thay đổi điều này cho #weather-wrapperphần tử bằng cách đặt flex-directionthành column.

Để căn giữa các mục, chúng tôi đã sử dụng place-itemsthuộc tính. Chúng tôi cũng làm cho #weather-searchphần tử có chiều rộng bằng một nửa chiều rộng của phần tử cha #weather-wrapper.

Nếu chúng ta lưu lại tệp styles.css , trang được hiển thị sẽ trông như thế này:

Ứng dụng được kết xuất với nhiều CSS hơn được thêm vào

Tuyệt vời! Ứng dụng của chúng tôi đang hoàn thiện!

Trong bước tiếp theo, chúng ta sẽ mã hóa JavaScript cho ứng dụng thời tiết của mình. Tuy nhiên, nó sẽ liên quan đến việc quay lại để tạo kiểu cho #weather-dataphần tử của chúng ta!

# Bước 5: Viết JavaScript
Bạn còn nhớ phần tử submit-type <input id="submit" type="submit" >mà chúng ta đã tạo ở bước trước không? Nó có một onclickthuộc tính được đặt thành một hàm có tên là fetchWeather().

Ở bước cuối cùng này, chúng ta sẽ viết fetchWeather()hàm này! Sau đó, khi chúng ta nhập gì đó và sử dụng nút "Tìm kiếm", hàm này sẽ được kích hoạt mọi lúc.

## Xác định chức năng của chúng ta
Hãy mở tệp script.jsfetchWeather() và bắt đầu bằng cách định nghĩa một hàm mới :
```
    function fetchWeather() {

    }
```
Hàm này không có tham số. Tiếp theo, chúng ta hãy tạo một vài biến bên trong hàm:
```
    function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "REPLACE WITH YOUR API KEY"; 
    }
```
Trong đoạn trích trên, chúng tôi đã thực hiện như sau:

Chúng tôi đã tạo một searchInputbiến với #searchgiá trị của phần tử, được chọn thông qua document.getElementById().
Chúng tôi cũng đã chọn #weather-dataphần tử mà kết quả tìm kiếm của chúng tôi sẽ xuất hiện.
Khi chúng ta tạo phần tử này lần đầu tiên ở Bước 3, displaythuộc tính của nó được đặt thành none. Chúng ta đã thay đổi thuộc tính này blocktrong hàm để có thể nhìn thấy dữ liệu đã lấy.
Cuối cùng, chúng tôi đã khởi tạo một apiKeybiến bằng một chuỗi giữ chỗ. Hãy đảm bảo thay thế chuỗi này bằng Khóa API OpenWeather của bạn (từ Bước 2).
Lưu ý: Không bao giờ, không bao giờ chia sẻ khóa API của bạn ở nơi công cộng để ngăn chặn việc hack và sử dụng không đúng mục đích các dịch vụ API. Nếu bạn định đẩy mã hướng dẫn của mình lên một nơi như GitHub, hãy thay thế giá trị apiKeybằng một bình luận hoặc chuỗi rỗng.

Vì bây giờ chúng ta có một biến biểu diễn #weather-dataphần tử, hãy thêm một ifcâu lệnh hiển thị thông báo tùy chỉnh khi đầu vào trống với innerHTMLthuộc tính của weatherDataSection biến:
```
    if (searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
    }

    Lưu ý: Hãy đảm bảo điều này được thực hiện trong fetchWeatherDate()hàm.

    Tiếp theo, chúng ta hãy định nghĩa hai hàm bên trong sẽ giúp chúng ta lấy thông tin thời tiết.

    function fetchWeather() {
    // Previous code

    async function getLonAndLat() {

    }

    async function getWeatherData(lon, lat) {

    }
    }
```
Chúng tôi cần những chức năng này để sử dụng hai API riêng biệt từ OpenWeather:

Người ta có thể lấy được tọa độ kinh độ và vĩ độ của một vị trí thông qua tên đã nhập.
Phần còn lại lấy dữ liệu thời tiết hiện tại dựa trên các tọa độ đó.
Bạn có thể nhận thấy rằng các hàm này có asynctừ khóa ở phía trước. Chúng ta sẽ sử dụng awaittừ khóa đi kèm, cùng với fetch()hàm, để đảm bảo chúng ta nhận được thông tin thời tiết hợp lệ mỗi lần.

## Viết hàm getLonAndLat()
Đầu tiên, hãy viết mã cho hàm getLonAndLat()sẽ sử dụng API GeoCoding của OpenWeather để trả về dữ liệu kinh độ và vĩ độ dựa trên searchInput.

Chúng tôi chỉ tìm kiếm theo vị trí. Do đó, searchInputphải là chuỗi tên vị trí hoặc thành phố hợp lệ (ví dụ: "Pittsburgh" hoặc "Brooklyn, NY").

Lưu ý: Nhưng bạn có thể thoải mái thêm nhiều tiêu chí tìm kiếm hơn vào mã này (ví dụ: mã bưu chính)!

Hãy định nghĩa hai biến trong getLonAndLat():

```
    async function getLonAndLat() {
    const countryCode = 1;
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
    }
```
Chúng tôi đã định nghĩa một countryCodesố nguyên cần thiết để API GeoCoding hoạt động. Tiếp theo, chúng tôi đã tạo một geocodeURLđiểm cuối API bao gồm countryCodecùng với apiKeychúng tôi đã định nghĩa trước đó.

Lưu ý: Đối countryCodevới Hoa Kỳ là 1, nhưng của bạn có thể khác. Hãy thử tìm kiếm của bạn tại đây .

Để trả về dữ liệu kinh độ và vĩ độ, chúng ta cần lấy dữ liệu từ API. Hãy thêm nội dung sau vào getLonAndLat():
```
    const response = await fetch(geocodeURL);
    if (!response.ok) {
    console.log("Bad response! ", response.status);
    return;
    }
```
Điều này trả về một đối tượng phản hồi từ API. Tuy nhiên, vì dữ liệu này đến từ một máy tính khác (có thể là máy chủ), nên nó có thể không được trả về ngay lập tức. Ngoài ra, chương trình được phép chạy trước, ngay cả khi chưa có phản hồi.

Đây là lý do tại sao chúng ta sử dụng async/await; phần await- ngăn chặn asynchàm liên quan tiếp tục cho đến khi dữ liệu phản hồi được trả về từ fetch(). Sau đó, chúng ta lưu trữ dữ liệu này trong một responsebiến. Nếu chúng ta nhận được phản hồi không hợp lệ (tức là !response.ok), thì một thông báo lỗi sẽ được ghi lại và không có gì được trả về.

Tiếp theo, chúng ta muốn lấy dữ liệu mã địa lý thực tế trong JSON (hoặc JavaScript Object Notation). Chúng ta có thể sử dụng đối responsetượng .json()để thực hiện việc này! Và vì dữ liệu đến từ phản hồi, nên nó không đồng bộ và chúng ta phải sử dụng awaittừ khóa:
```
    const data = await response.json();
```
Sau đó, chúng ta hãy thêm câu lệnh if/ sau else vào bên dưới nơi chúng ta đã định nghĩa data:
```
    if (data.length == 0) {
    console.log("Something went wrong here.");
    weatherDataSection.innerHTML = `
    <div>
        <h2>Invalid Input: "${searchInput}"</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
    } else {
    return data[0];
    }
```
Nếu lệnh gọi API của chúng ta không thành công, datamảng của chúng ta sẽ trống và thông báo lỗi sẽ được hiển thị. Nếu không, sẽ có một đối tượng JSON được lưu trữ làm phần tử đầu tiên và chúng ta sẽ trả về đối tượng đó trong mệnh đề else.

Bây giờ là lúc thực hiện chức năng bên trong tiếp theo!

## Viết hàm getWeatherData()
Hàm này getWeatherData()chấp nhận tham số a lonvà latsẽ được sử dụng trong lệnh gọi API cho dữ liệu thời tiết hiện tại. Thông tin này đến từ hàm getLonAndLat()chúng ta đã định nghĩa trước đó.

Vì hàm này cũng hoạt động với dữ liệu phản hồi được lấy nên nó cũng nhận được asynctừ khóa.

Đầu tiên, chúng ta sẽ định nghĩa một weatherURLbiến và gán chuỗi điểm cuối API OpenWeather khác cho biến đó:
```
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
```
Tiếp theo, chúng ta sẽ định nghĩa một responsebiến và gán cho nó đối tượng được trả về bởi fetch()hàm với nội dung weatherURLđược truyền vào.

Lưu ý: Đừng quên awaittừ khóa cho các biến responsevà data!
```
    const response = await fetch(weatherURL);
    if (!response.ok) {
    console.log("Bad response! ", response.status);
    return;
    }

    const data = await response.json();
```
Giống như trước, chúng ta sẽ in thông báo lỗi và không trả về gì nếu có vấn đề. Nếu không, chúng ta sẽ tiếp tục và tạo một data đối tượng khác với đối tượng JSON cho dữ liệu thời tiết hiện tại.

## Hiển thị dữ liệu thời tiết
Đối với phần tiếp theo này, chúng ta sẽ hoàn thành công việc bên trong hàm getWeatherData(), cũng như trong fetchWeather()hàm bên ngoài. Chúng ta sẽ hiển thị datathông tin vừa nhận được vào tệp HTML. Sau đó, chúng ta sẽ thực sự thấy dữ liệu API được yêu cầu hiển thị trên trình duyệt!

Sử dụng thông tin thời tiết từ databiến, chúng ta hãy thực hiện những điều sau với weatherDataSection:
```
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `
```
Chúng tôi đã sử dụng .innerHTMLthuộc tính này để gán một số HTML mới cho #weather-dataphần tử được chọn, chẳng hạn như:

data.weather[0].iconđể có hình ảnh đại diện cho thời tiết hiện tại.
data.namecho địa điểm/thành phố.
data.main.tempđối với nhiệt độ (mặc định được đo bằng độ Kelvin , do đó phải làm tròn).
data.weather[0].descriptionđể có mô tả ngắn gọn về thời tiết hiện tại.
Bây giờ chúng ta đã hoàn tất việc viết getWeatherData()hàm! Nhưng bây giờ, chúng ta thực sự cần sử dụng các hàm vừa định nghĩa để hoàn tất việc viết fetchWeather()hàm bên ngoài.

Gần dấu ngoặc nhọn đóng '}' của fetchWeather()hàm bên ngoài, hãy thêm đoạn mã sau:
```
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
```
Đầu tiên, chúng ta đặt lại giá trị của searchInputthành một chuỗi rỗng để văn bản đầu vào được xóa khỏi ứng dụng sau khi tìm kiếm.
Tiếp theo, chúng tôi định nghĩa một geocodeDatabiến có dữ liệu kinh độ và vĩ độ được trả về bởi getLonAndLat().
Cuối cùng, chúng ta chỉ cần gọi getWeatherData()hàm và truyền vào các thuộc tính .lonvà của biến..latgeocodeData
Vì dữ liệu trả về getLonAndLat()là dữ liệu phản hồi không đồng bộ, chúng tôi đã đặt một awaittừ khóa trước nó. Do đó, chúng ta cần thêm từ asynckhóa vào fetchWeather()hàm bên ngoài của mình:

```
    async function fetchWeather() {
    // Rest of code below
    }
```
Hãy lưu script.js và kiểm tra xem ứng dụng của chúng ta có hiển thị dữ liệu thời tiết khi tìm kiếm theo vị trí hay không.

## Kiểu dữ liệu thời tiết
Chúng ta sắp hoàn thành rồi!

Chỉ còn một vài việc cuối cùng cần làm cho cả tệp CSS và JavaScript. #weather-dataPhần tử của chúng ta đang hoạt động như mong đợi, nhưng bây giờ hãy định dạng nó thêm một chút!

Trong getWeatherData()hàm này, chúng ta hãy đặt thông tin thời tiết bên cạnh biểu tượng bằng cách thay đổi displaythuộc tính của weatherDataSectionbiến từ "block"thành "flex":

```
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `
```
Chúng tôi đã tạo #weather-dataphần tử thành một flex container với mã JavaScript... thật tuyệt! Hãy tiếp tục và lưu script.js .

Bây giờ, hãy mở lại tệp styles.css và thêm nội dung sau vào cuối:
```
    #weather-data {
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 5px;
    padding: 1.5em;
    margin-top: 20px;

    text-align: center;
    align-items: center;
    gap: 12px;
    }

    #weather-data > img {
    border-radius: 50%;
    background-color: lightskyblue;
    }
```
Trong đoạn trích trên, chúng tôi đã thêm một số kiểu vào #weather-dataphần tử, bao gồm:

A background-colorlà bán trong suốt ( rgba()).
Một số thiết lập lớp hộp cho border-radius, padding, và margin-top.
Văn bản căn giữa.
Một số thuộc tính tập trung vào Flexbox giúp căn chỉnh biểu tượng và thông tin thời tiết về phía trung tâm và tạo một khoảng cách nhỏ giữa chúng.
# Phần kết luận
Xin chúc mừng! Chúng tôi đã hoàn thành việc xây dựng ứng dụng thời tiết!

Hãy tiếp tục và lưu tệp styles.css của chúng ta lần cuối! Làm mới trang đã hiển thị và thử nhập thành phố yêu thích của bạn:

Hoàn thành ứng dụng thời tiết

Sử dụng ba khối xây dựng HTML, CSS và JavaScript, chúng tôi đã có thể xây dựng một ứng dụng chức năng sử dụng một số thành phần giao diện người dùng và giao diện quản trị sâu như:

Lập trình không đồng bộ với dữ liệu API và các chức năng dựa trên web như fetch().
Sắp xếp nội dung thông qua CSS Flexbox.
Thao tác DOM (Mô hình đối tượng tài liệu) bằng document.getElementById().
Bạn sẽ xây dựng ứng dụng này như thế nào? Một số ý tưởng có thể là thêm nhiều dữ liệu hơn như độ ẩm và tốc độ gió/gió giật, hoặc bao gồm dự báo 5 hoặc 10 ngày.

## Thêm tài nguyên
Trang API OpenWeather[https://openweathermap.org/api/]
Thao tác DOM cơ bản (Tài liệu MDN)
Lập trình bất đồng bộ (Chương từ sách Eloquent JavaScript)