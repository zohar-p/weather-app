// TODO:
// failcase all calls

const searchBtn = $('#search-btn')

const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const loadPage = async ()=>{
    await logic.getCities()
        // .then(()=>renderer.renderData(logic.cityData))
        renderer.renderData(logic.cityData)
}
loadPage()

$(searchBtn).on('click', function () { 
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
