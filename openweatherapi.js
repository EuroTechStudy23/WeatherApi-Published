//* önce input, button ve div elementlerini seçelim
//* aldığımız apikeyi bir değişkene atayalım
//* button'a tıklanmasıyla veri çekme işlemini başlatmak için, buton elementine bir click eventi tanımlayalım
    //* bu click eventi içinde öncelikle kullanıcının girmiş olduğu değeri, input elementinden elde edelim
    //* daha sonra elde edilen bu şehir ismini "getWeather" isimli fonksiyona argüman olarak gönderelim
    //*bu event içinde ayrıca input alanındaki değeri boşaltalım ve otomatik focus olması için focus methodunu çağıralım.
//* bir üstte getweather fonksiyonunu çağırdık,bu fonksiyonu oluturalım şimdi, burda gelen şehir ismine göre hava durumu verisini çekeceğiz
    //* fonksiyonu async-await keywordleri ile yazmaya çalışalım
    //* ilk satırda fonksiyona argüman olarak gelen şehir ismini ve global alanda tanımladığımız apikey değerini kullanarak, url'mizi tanımlayalım.
    //* daha sonra try-catch yapısını oluşturalım
        //* try bloğunda await keywordlerini kullanarak fetch işlemini yapalım, error handling konusunda verdiğim örneklere bakarak yapılabilir.
        //* fetch methodu ile elde ettiğimiz datayı renderCityWeather isimli oluşturacağımız fonksiyona gönderelim. bu fonksiyon gelen veriye göre sayfaya
        //* içerikleri bastırıyor.
//* renderCityWeather isimli fonksiyon içinde önce gelen veriyi okuyalım ve yapısını inceleyelim, sonra buna göre destructuring işlemini yapalım
    //* destructure işlemini doğru yaptıysak daha önce seçtiğimiz div elementi içine bu değerleri html elementiyle birlikte ekleyelim.
    //* iconlarla ilgili ayrı bir işlem yapmanız gerekiyor, gelen veride iconun sadece kodu var, bu kodu alıp iconları gösteren bir url'ye monte etmeniz gerekiyor, yani son hali şu şekilde olacak: `http://openweathermap.org/img/wn/${icon}.png`, bunu bir değişkene atayıp daha sonra img elementinde kullanacağız.
    // npm install dotenv

// require('dotenv').config();
const apiKey = process.env.API_KEY;

console.log(apiKey)
const searchBtn = document.querySelector(".btn");
const inputArea = document.querySelector(".inp");


searchBtn.addEventListener("click",()=>{
    let city = inputArea.value;        
        if(!city){
            return;
        }
        getWeather(city)
        inputArea.value = "";
        inputArea.focus();


})


const getWeather = async (cityName) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`
    try {
        let response = await fetch(url)
        if(!response.ok){
            throw new Error(`bir hata oluştu: ${response.status}`)
        }
        let data = await response.json();
        renderCityWeather(data)
    } catch (error) {
        console.log(error)
    }
}





const renderCityWeather = (data) =>{
    console.log(data)
    // const {location:{name, country,tz_id}, current:{temp_c:temp, condition:{icon,text:weatherCondition}}} = data
    const {name, sys:{country}, main:{temp}, main:{temp_min}, main:{temp_max}, weather:[{description}], weather:[{icon}]} = data;
    const weatherIcon = `http://openweathermap.org/img/wn/${icon}.png`;
    let content = document.querySelector(".content");
    content.innerHTML += `<div class="card">
   <div class="city">${name},${country}</div>
   <div class="temp">${Math.round(temp)}°C</div>
   <img class="img" src="${weatherIcon}" />
   <div class="desc">${description}</div>
   <div class="minmax">${Math.round(temp_min)}°C/${Math.round(
temp_max
)}°C</div><div>`;
}

inputArea.addEventListener("keydown", (e)=>{
    if(e.keyCode == "13"){
        searchBtn.click();
    }
})