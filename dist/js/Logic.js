class Logic {
    constructor(){
        this.cityData = []
    }
    // TODO: add fail cases for all
    getCities(){
        return apiManager.fetchCities()
            .then(cities=> cities[0] ? this.cityData = [...cities] : false) // failcase
    }

    getCityData(cityName){
        return apiManager.fetchCityData(cityName)
            .then(data=>{
                this.cityData.push({
                    name: data.location.name,
                    updatedAt: data.current.last_updated,
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    conditionPic: data.current.condition.icon
                })
            })
    }

    saveCity(cityName){
        const cityInfo = this.cityData.find(c=> c.name == cityName)
        if(cityInfo){
            apiManager.createCity(cityInfo)
            this.getCities()
            return true
        } else {
            return false // failcase
        }
    }

    removeCity(cityName){
        apiManager.deleteCity(cityName)
        this.getCities()
    }
}