// TODO:

// on load render current location weather
// handle external API error
// change push to unshift
// failcase all calls


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
        await logic.getCityData(searchVal)
        renderer.renderData(logic.cityData)
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

    const cityName = $(this).closest('.single-city').find('.city-name').text()
    const relCity = logic.cityData.find(c => c.name == cityName)
    renderer.renderDisplayedCity(relCity)
});