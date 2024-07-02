// input search
let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");
// today
let todayDateName = document.getElementById("todayDateName");
let todayDateDayNumber = document.getElementById("todayDateDayNumber");
let todayDateMonth = document.getElementById("todayDateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayImg = document.getElementById("todayImg");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
// Next Day
let nextDateName = document.getElementsByClassName("nextDateName");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextConditionText = document.getElementsByClassName("nextConditionText");
let nextDateImg = document.getElementsByClassName("nextDateImg");

// fetch data
async function getData(cityName) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3682fe7f38364158aed05025243006&q=${cityName}&days=3`
  );
  let result = await data.json();
  return result;
}

// display today data
function displayTodayData(Data) {
  let todayDate = new Date();
  todayDateName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayDateDayNumber.innerHTML = todayDate.getDate();
  todayDateMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  todayLocation.innerHTML = Data.location.name;
  todayTemp.innerHTML = Data.current.temp_c;
  todayImg.setAttribute("src", Data.current.condition.icon);
  todayConditionText.innerHTML = Data.current.condition.text;
  humidity.innerHTML = Data.current.humidity + "%";
  wind.innerHTML = Data.current.wind_kph + "Km/h";
  windDirection.innerHTML = Data.current.wind_dir;
}

// display next day data
function displayNextData(Data) {
  let forecastData = Data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDateName[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextDateImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}
// start app
async function startApp(city = "cairo") {
  let weatherData = await getData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextData(weatherData);
  }
}
startApp();
// inputSearch
inputSearch.addEventListener("input", function () {
  startApp(inputSearch.value);
});
