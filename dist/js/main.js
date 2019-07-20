// TODO:

// add set interval for updated at
// add a refresh btn (PUT request)
// color updated at when over one hour
// updatedAt apears as mins ago (fix format time)
// fix blink in displayed city rendering
// change to Farenheit on tap
// size cities list according to amount of cities
// change color according to temp
// manage cities order
// failcase all calls
// on load render current location weather


const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const loadPage = async ()=>{
    await logic.getCities()
    renderer.renderData(logic.cityData)
}
loadPage()

$('#search-btn').on('click', async function () { 
    const searchVal = $('#search-inp').val()
    $('#search-inp').val('')
    if(!searchVal){
        // TODO: handle empty input
    } else {
        const city = await logic.getCityData(searchVal)
        city.hasOwnProperty('error') ? renderer.renderError(city.error) : renderer.renderData(logic.cityData, city)
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
});

$('#search-inp').on('focus', function () {
    $(this).attr('placeholder', 'Look up a city')
        .removeClass('error')
})