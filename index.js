const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "41f88124f31990f0213e14d612b6cdbf";

weatherform.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Error! City not found, please try again");
    }

});

async function getweatherdata(city){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiURL)

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();


    console.log(response);
}
function displayweatherinfo(data){

    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descriptiondisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descriptiondisplay.textContent = description;
    weatheremoji.textContent = getweatheremoji(id);


    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descriptiondisplay.classList.add("decriptiondisplay");
    weatheremoji.classList.add("weatheremoji");


    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descriptiondisplay);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid){
    
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⚡";
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";
        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case (weatherid === 800):
            return "☀️";
        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
        default:
            return ""
    }
}

function displayerror(message){

    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
    
}

