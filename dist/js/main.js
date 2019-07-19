// TODO:

// add set interval for updated at
// updatedAt apears as mins ago (fix format time)
// fix blink in displayed city rendering
// on city lookup city displayed and active
// change to Farenheit on tap
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
        city.hasOwnProperty('error') ? renderer.renderError(city.error) : renderer.renderData(logic.cityData)
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
});

$('#search-inp').on('focus', function () {
    $(this).attr('placeholder', 'Look up a city')
        .removeClass('error')
})