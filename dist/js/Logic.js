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

    async getCityData(location, isCurrentLocation){
        const query = isCurrentLocation ? `lat=${location.lat}&long=${location.long}` : `q=${location}`
        const fetchedCityData = await apiManager.fetchCityData(query)

        if(fetchedCityData.failed) { return fetchedCityData }

        let alreadyExist = this.cityData.find(c=> c.id == fetchedCityData.id)
        if(alreadyExist){
            fetchedCityData.exist = true
        } else {
            this.cityData.unshift(fetchedCityData)
        }

        return fetchedCityData
    }

    async saveCity(cityName){
        const cityInfo = this.cityData.find(c=> c.name == cityName)
        if(cityInfo){
            cityInfo.isSaved = true
            await apiManager.createCity(cityInfo)
        }
    }

    removeCity(cityName){
        const relCity = this.cityData.find(c => c.name == cityName)
        this.cityData = this.cityData.filter(c => c.name != cityName)
        relCity.isSaved ? apiManager.deleteCity(cityName) : null
    }

    async refreshDisplayedCity(cityName){
        const relCityIndex = this.cityData.findIndex(c => c.name == cityName)
        const query = `q=${cityName}`
        const updatedCity = await apiManager.fetchCityData(query)
        updatedCity.isSaved = this.cityData[relCityIndex].isSaved
        return this.cityData[relCityIndex] = updatedCity
    }
}