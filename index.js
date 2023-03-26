//My API: 2ee662fc627b8fa25984463d776a7b7f
var container = document.getElementById('weather')
var userInput
var URL = "https://api.openweathermap.org/data/2.5/weather"
var queryString 
var fetchURL = URL + queryString
var h2 = document.createElement('h2')
var form = document.querySelector('form')

//need form to submit on click
form.onsubmit = function(e) {
    e.preventDefault()
    container.innerHTML = ''
   userInput = this.search.value.trim() 
   if (!userInput) return
    form.search.value = ''
    queryString = "?units=imperial&appid=2ee662fc627b8fa25984463d776a7b7f&q=" + userInput
    fetchURL = URL + queryString
    fetch(fetchURL)
    .then(function(res) {
        //throw error if location isn't found
        if (res.status !== 200){
            throw new Error('Location not Found')
        }
        return res.json()
    })
    .then(function(data) {
        
        h2.textContent = data.name + ', ' + data.sys.country
        container.appendChild(h2)

        //Add a line break between elements
        var br = document.createElement('br')
        //pull map
        var map = document.createElement('a')
        lat = data.coord.lat
        long = data.coord.lon
        map.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long)
        map.textContent = 'Click to view map'
       container.appendChild(map)

        //pull image
        var img = document.createElement('img')
        img.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
        container.appendChild(img)

        //weather description
        var description = document.createElement('p')
        description.textContent = data.weather[0].description
        description.style.textTransform = 'capitalize'
        container.appendChild(description)

        container.appendChild(br)

        //display current temperature
        var currentTemp = document.createElement('p')
        currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
        container.appendChild(currentTemp)

        //display feels like temperature
        var feelsLike = document.createElement('p')
        feelsLike.textContent = 'Feels like: ' + data.main.feels_like + ' °F'
        container.appendChild(feelsLike)

        //last updated calculation
        var date = new Date(data.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        //display last updated
        var lastUpdated = document.createElement('p')
        lastUpdated.textContent = 'Last Updated: ' + timeString
        container.appendChild(lastUpdated)
    })
    .catch(function(err) {
    var errMessage = document.createElement('h2')
    errMessage.textContent = 'Location not Found'
        container.appendChild(errMessage)
    })
}

function displayWeather() {
    h2.textContent = data.name + ', ' + data.sys.country
    container.appendChild(h2)
}