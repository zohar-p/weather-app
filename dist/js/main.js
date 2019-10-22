
// TODO:

// Refresh city after ten mins
// Add get Current location weather btn
// handle is current location correctly
// Prevent errors from being saved to logic.cityData
// Make current location unique (icon / color ?)
// manage cities order
// Fix Icons size and layout
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
    const cityID = $('[data-display-city-id]').data('display-city-id')
    const relCity = logic.cityData.find(c => c.id === cityID)
    const duration = Math.round(moment.duration(moment().diff(moment(relCity.updatedAt))).asMinutes())
    const minutesAgoString = `Updated ${duration === 0 ? ' a few moments ' : duration === 1 ? ' a minute ' : ` ${duration} minutes `} ago`
    renderer.renderUpdatedAgo(minutesAgoString)
    // if(duration > 9) {
    //     if(relCity.isCurrentLocation) {
    //         navigator.geolocation.getCurrentPosition(displayLocation)
    //     } else {
    //         refreshCity()
    //     }
    // }
}

const onLoadPage = async ()=>{
    await logic.getCities()
    renderer.renderData(logic.cityData)
    navigator.geolocation.getCurrentPosition(displayLocation)
}

const refreshCity = async () => {
    const cityName = $('#displayed-name').text()
    const relCity = await logic.refreshDisplayedCity(cityName)
    renderer.renderDisplayedCity(relCity)
    checkWhenWasLastUpdate()
}

$('#search-btn').on('click', async function () { 
    const searchVal = $('#search-inp').val()
    $('#search-inp').val('')
    if(!searchVal){
        // TODO: handle empty input
    } else {
        const city = await logic.getCityData(searchVal)
        city.failed ? renderer.renderError(city.errorMessage) : city.exist ? selectCity(city) : renderer.renderData(logic.cityData, city) // fix error handling
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

const selectCity = relCity => {
    const cityBox = $(`[data-city-id=${relCity.id}]`)
    renderer.renderDisplayedCity({...relCity})
    renderer.renderActiveCity(cityBox)
    renderer.renderBgcolor(relCity.temp)
    checkWhenWasLastUpdate()
}

$('#cities').on('click', '.city-preview', function () {
    const cityID = $(this).closest('[data-city-id]').data('city-id')
    const relCity = logic.cityData.find(c => c.id == cityID)
    selectCity(relCity)
});

$('#search-inp').on('focus', function () {
    $(this).attr('placeholder', 'Look up a city')
        .removeClass('error')
})

$('#displayed-city').on('click', '#refresh', refreshCity); 

onLoadPage()