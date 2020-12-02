var x = document.getElementById("ViewClothes");

var temperature = localStorage.temp;
var weather = localStorage.weather;
var weatherDes = localStorage.weatherDes;
var txt="";

if(temperature>=28){
  x.innerHTML="민소매, 반팔, 반바지, 원피스를 입으면 좋아요.";
}else if(temperature>=23){
  x.innerHTML = "반팔, 얇은셔츠, 반바지, 면바지를 입으면 좋아요.";
}else if(temperature>=20){
  x.innerHTML = "얇은 가디건, 긴팔, 면바지, 청바지를 입으면 좋아요.";
}else if(temperature>=17){
  x.innerHTML = "얇은 니트, 맨투맨, 가디건, 청바지를 입으면 좋아요.";
}else if(temperature>=12){
  x.innerHTML = "자켓, 가디건, 야상, 스타킹, 청바지, 면바지를 입으면 좋아요.";
}else if(temperature>=9){
  x.innerHTML = "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹를 입으면 좋아요.";
}else if(temperature>=5){
  x.innerHTML = "코트, 가죽자켓, 히트텍, 니트, 레깅스를 입으면 좋아요.";
}else{
  x.innerHTML = "패딩, 두꺼운코트, 목도리, 기모제품를 입으면 좋아요.";
}

switch (weather) {
  case 'Rain', 'Drizzle':
    txt = "오늘은 비가내려요. 우산 챙기세요.";
    break;
  case 'Snow':
    txt = "오늘은 눈이내려요. 우산 챙기세요.";
    break;
  case 'Extreme':
    txt = "밖에 나가지 않는걸 추천드려요.";
    switch(weatherDes){
      case 'tornado', 'tropical storm', 'hurricane', 'hail':
        txt += "오늘은 폭풍이 치네요. 우산 챙기시고, 바람 조심하세요.";
        break;
      case 'cold':
        txt += "오늘은 너무 춥네요. 따뜻하게 입고 나가세요";
        break;
      case 'hot':
        txt += "오늘은 너무 덥네요. 열사병에 조심하세요.";
        break;
      case 'windy':
        txt += "오늘은 바람이 너무 강해요. 조심하세요.";
        break;
      default:
        break;
    }
    break;
  default:
    break;
}
x.innerHTML = x.innerHTML+"<br>"+txt;
