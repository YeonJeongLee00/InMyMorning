var viewWeather = document.getElementById("ViewWeather");
var weather = document.getElementById("weather");
const WeatherAPI_KEY = "48992f8affbb2eadacad5dca52012462";
// const AddressAPI_KEY = "2ea626b3b1bb7eb9fa3d0c06dd5ebbd6";
const DustAPI_KEY = "PhZMjzv3ep4%2B5C66mrfrWp%2FZ2KlNZXvPtrhes6z83RHWoSB93UUZ865pD70YNLMbEYHtTxPlBkR9UiB7qAm0IQ%3D%3D";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  getWeather(lat, lng);
  

function getWeather(lat, lng){
  fetch(
        // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WeatherAPI_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            document.getElementById("weather").style.display='none';
            var temperature = json.main.temp; // 현재온도
            var hum = json.main.humidity; // 현재습도
            var wind = json.wind.speed; // 바람
            var cloud = json.clouds.all; // 구름
            var weather = json.weather[0].main; // 날씨
            var weatherDes = json.weather[0].description; // 상세날씨설명
            var place = json.name; // 도시이름
            var country = json.sys.country; // 나라
            var icon = json.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/w/" + icon + ".png";
            var img = document.createElement('img');
            img.setAttribute("src",imgURL);
            img.setAttribute("height", '100px');
            img.setAttribute("width", "100px");
            document.getElementById('img').appendChild(img);
            localStorage.setItem('temp',temperature);
            localStorage.setItem('weather', weather);
            localStorage.setItem('place', place);
            localStorage.setItem('icon', icon);
            localStorage.setItem('hum', hum);
            localStorage.setItem('wind', wind);
            localStorage.setItem('weatherDes', weatherDes);
            localStorage.setItem('country', country);
            localStorage.setItem('cloud', cloud);
            // console.log(json);
            var iwind = document.createElement("i");
            iwind.setAttribute("class", "fas fa-wind");
            document.getElementById('wind').appendChild(iwind);
            var ihum = document.createElement("i");
            ihum.setAttribute("class", "fas fa-water");
            document.getElementById('hum').appendChild(ihum);
            var icloud = document.createElement("i");
            icloud.setAttribute("class", "fas fa-cloud");
            document.getElementById('cloud').appendChild(icloud);
            document.getElementById('temperature').innerHTML = temperature+"&deg;C\n<br>"+weatherDes+"\n<br>"+place+","+country;
            document.getElementById('wind').innerHTML = document.getElementById('wind').innerHTML+" "+wind+"m/s";
            document.getElementById('hum').innerHTML = document.getElementById('hum').innerHTML+" "+hum+"%";
            document.getElementById('cloud').innerHTML = document.getElementById('cloud').innerHTML+" "+cloud+"%";
        })
}
