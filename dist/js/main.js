// TODO:
// failcase all calls




const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const loadPage = async ()=>{
    await logic.getCities()
    renderer.renderData(logic.cityData)
}
loadPage()

$('#search-btn').on('click', function () { 
    const searchVal = $('#search-inp').val()
    if(!searchVal){
        // TODO: handle empty input
    } else {
        logic.getCityData(searchVal)
        .then(()=>{
            renderer.renderData(logic.cityData)
        })
    }
});

$('#cities').on('click', '.save-city-btn', async function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    await logic.saveCity(cityName)
    const cities = await logic.getCities()
    // await logic.getCities()
    renderer.renderData(logic.cityData)
});

$('#cities').on('click', '.remove-city-btn', function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    logic.removeCity(cityName)
        .then(()=>logic.getCities()
            .then(()=>renderer.renderData(logic.cityData)))
});