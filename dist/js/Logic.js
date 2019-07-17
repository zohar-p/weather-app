class Logic {
    constructor(){
        this.cityData = []
    }

    getCities(){
        apiManager.fetchCities()
            .then(cities=> this.cityData = [...cities])
    }
}