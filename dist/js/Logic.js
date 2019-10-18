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
        if(fetchedCityData.failed){
            console.log('failed')
            return fetchedCityData
        } else {
            const alreadyExist = this.cityData.find(c=> c.name.toLowerCase() == fetchedCityData.name.toLowerCase())
            if(alreadyExist){
                console.log('already exist')
                return {error: 'This city is already in your list'} // TODO: instead - select the city
            } else {
                this.cityData.unshift(fetchedCityData)
                return this.cityData[0]
            }
        }
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
        const isCitySaved = this.cityData
            .find(c => c.name == cityName)
            .isSaved
        console.log(isCitySaved ? 'city is saved' : 'city not saved')
        const updatedCity = await apiManager.updateDisplayedCity(cityName, isCitySaved)
        console.log(updatedCity)
        const relCityIndex = this.cityData.findIndex(c => c.name == cityName)
        this.cityData[relCityIndex] = updatedCity
        return this.cityData[relCityIndex]
    }
}