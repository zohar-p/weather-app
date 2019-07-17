class Logic {
    constructor(){
        this.cityData = []
    }

    getCities(){
        apiManager.fetchCities()
            .then(cities=> cities != [] ? this.cityData = [...cities] : null) // TODO: fail case for empty DB
    }

    getCityData(cityName){
        apiManager.fetchCityData(cityName).then(data=>console.log(data))
    }
}