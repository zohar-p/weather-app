
// TODO:

// Fix refresh
// updatedAt apears as mins ago (fix format time)
// When a city is re-searched select it
// Make current location unique - no option to save it and maybe different appearence
// add Cron timer for repeating calls.
// add set interval for updated at
// manage cities order
// handle search fail
// fix blink in displayed city rendering
// failcase all calls
// size cities list according to amount of cities

const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const displayLocation = async (position) =>{
    const geolocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }
    const city = await logic.getCityData(geolocation, true)
    city.failed ? renderer.renderError(city.errorMessage) : renderer.renderData(logic.cityData, city)
    checkWhenWasLastUpdate()
    setInterval(checkWhenWasLastUpdate, 60000)
}

const checkWhenWasLastUpdate = () => {
    const cityName = $('#displayed-name').text()
    const relCity = logic.cityData.find(c => c.name === cityName)
    const minutesUpdatedAgo = moment(relCity.updatedAt).fromNow()
    renderer.renderUpdatedAgo(minutesUpdatedAgo)
}

const onLoadPage = async ()=>{
    await logic.getCities()
    renderer.renderData(logic.cityData)
    const currentLocationExist = $('.city-name:contains("Current Location")').length
    currentLocationExist ? null : navigator.geolocation.getCurrentPosition(displayLocation)
}

$('#search-btn').on('click', async function () { 
    const searchVal = $('#search-inp').val()
    $('#search-inp').val('')
    if(!searchVal){
        // TODO: handle empty input
    } else {
        const city = await logic.getCityData(searchVal)
        city.hasOwnProperty('error') ? renderer.renderError(city.error) : renderer.renderData(logic.cityData, city) // fix error handling
        checkWhenWasLastUpdate()
    }
});

$('#cities').on('click', '.save-city-btn', async function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    await logic.saveCity(cityName)
    await logic.getCities()
    renderer.renderData(logic.cityData)
});

$('#cities').on('click', '.remove-city-btn', async function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    await logic.removeCity(cityName)
    await logic.getCities()
    renderer.renderData(logic.cityData)
});

$('#cities').on('click', '.city-preview', function () {
    const cityBox = $(this).closest('.single-city')
    const cityName = cityBox.find('.city-name').text()
    const relCity = logic.cityData.find(c => c.name == cityName)
    renderer.renderDisplayedCity({...relCity})
    renderer.renderActiveCity(cityBox)
    renderer.renderBgcolor(relCity.temp)
    checkWhenWasLastUpdate()
});

$('#search-inp').on('focus', function () {
    $(this).attr('placeholder', 'Look up a city')
        .removeClass('error')
})

$('#displayed-city').on('click', '#refresh', async function () {
    const cityName = $('#displayed-name').text()
    const relCity = await logic.refreshDisplayedCity(cityName)
    renderer.renderDisplayedCity(relCity)
});

onLoadPage()