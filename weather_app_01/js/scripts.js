let $j = jQuery;

    
function formSubmit(event1){
    event1.preventDefault();
    showWeatherData();
    resetElements();
}

function showWeatherData() {
   getWeatherData(document.getElementById('location').value);
}

function getWeatherData(my_location){

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${my_location}?unitGroup=metric&key=9845G8NJT2WSM35GUMAQ8HYZ4&contentType=json`, {
    "method": "GET",
    "headers": {
    },

    })
    .then(response => {
        if (!response.ok) {
        throw response; //check the http response code and if isn't ok then throw the response as an error
        }
                
        return response.json(); //parse the result as JSON
    
    }).then(response => {
        //response now contains parsed JSON ready for use
        processWeatherData(response);
    
    }).catch((errorResponse) => {
        if (errorResponse.text) { //additional error information
        errorResponse.text().then( errorMessage => {
            //errorMessage now returns the response body which includes the full error message
        })
        } else {
        //no additional error information 
        } 
    });

    function processWeatherData(response) {
        let location=response.resolvedAddress,
            days=response.days,
            currentConditions = response.currentConditions;

        let main = $j('.main-container'),
            header = $j('.header'),
            content = $j('.content');
        

        let showLocation = (geo) => { // Add location name to the header
            if ($j('.location-name')) {$j('.location-name').remove();}
            header.prepend("<div class='location-name'>" + geo + "</div>");
        }

        showLocation(location);

        
        let setTempType = (temp) => {
            switch (true){
                case (temp < -25) : className = 'extremally_cold';
                break;
                case (temp >= -25 && temp < -10) : return 'very cold';
                break;
                case (temp >= -10 && temp < 0) : return'cold';
                break;
                case (temp >= 0 && temp < 15) : return 'normal';
                break;
                case (temp >= 15 && temp < 25 ): return 'warm';
                break;
                case (temp >= 25 && temp < 30 ): return 'hot';
                break;
                case (temp >= 30 && temp < 35 ): return'very_hot';
                break;
                case (temp >= 35 ): return 'extremally_hot';
                break;
            }
            return className;
        }

        let setWindType = (wind) => {
            switch (true){
                case (wind < 20) : return 'slow';
                case (wind >= 20 && wind < 38) : return 'fresh';
                case (wind >= 39 && wind < 75) : return 'strong';
                case (wind >= 75 && wind < 103) : return 'storm';
                case (wind >= 103 && wind < 118) : return 'strong_storm';
                case (wind >= 118) : return 'hurricane';
            }
        }

        let showWeather = () => {
            let classNameFromCondtions = (str) => {
                return (str + "").toLowerCase().replace(", ", ",").replace(" ", "-").replace(",", " ").replace("/", "-");
            }
            let currentWeatherClassName = classNameFromCondtions(currentConditions.conditions);
               
            $j('body').addClass('weather-display ' + currentWeatherClassName);
            header.prepend(`<div class="current-weather ${currentWeatherClassName}">${currentConditions.temp}</div>`); // add current weather conditions to the header


            content.append('<div class="data-grid"></div>'); //Create grid with 15 days forecast
            for (let i=0; i<days.length; i++) {
                let day = (i == 0) ? ('Today') : ((i == 1) ? ('Tomorrow') : days[i].datetime),

                    tempmin = days[i].tempmin,
                    tempmax = days[i].tempmax,

                    forecastWeatherClassName = classNameFromCondtions(days[i].conditions),

                    date = `<div class="date ${forecastWeatherClassName}">${day}</div>`,
                    tempMax = `<div class="tempmax ${setTempType(tempmax)}"><span class="label">Max:</span> ${tempmax}</div>`,
                    tempMin = `<div class="tempmin"><span class="label">Min:</span>${tempmin}</div>`,
                    wind = `<div class="wind ${setWindType(days[i].windspeed)}">${days[i].windspeed} km/h</div>`,
                    descr = `<div class="conditions">${days[i].conditions}</div>`;
                $j('.data-grid').append( date + tempMax + tempMin + descr + wind );
            }
        }
        showWeather();
    }
}


function resetElements() {
    document.forms['search-location'].reset();
    $j('body').removeAttr('class');
    $j('.current-weather').remove();
    $j('.location-name').remove();
    $j('.content').empty();
}
