// TODO:
// failcase all calls

const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const loadPage = ()=>{
    logic.getCities()
        .then(cities=>renderer.renderData(cities))
}
loadPage()

const handleSearch = ()=>{
    
}