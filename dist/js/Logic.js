class Logic {
    constructor(){
        this.cityData = []
    }
    // TODO: add fail cases for all
    async getCities(){
        const cities = await apiManager.fetchCities()
        if(cities.length){
            this.cityData = this.cityData.filter(c=> !c.isSaved)
            this.cityData.push(...cities)
        }
    }

    async getCityData(cityName){
        const fetchedCityData = await apiManager.fetchCityData(cityName)
        this.cityData.push({
            name: fetchedCityData.location.name,
            updatedAt: fetchedCityData.current.last_updated,
            temp: fetchedCityData.current.temp_c,
            condition: fetchedCityData.current.condition.text,
            conditionPic: fetchedCityData.current.condition.icon,
            isSaved: false
        })
    }

    async saveCity(cityName){
        const cityInfo = this.cityData.find(c=> c.name == cityName)
        if(cityInfo){
            await apiManager.createCity(cityInfo)
            cityInfo.isSaved = true
        }
    }

    removeCity(cityName){
        return apiManager.deleteCity(cityName)
    }
}