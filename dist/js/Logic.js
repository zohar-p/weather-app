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
        if(fetchedCityData.hasOwnProperty('error')){
            const errorMsg = JSON.parse(fetchedCityData.error).error.message
            return {error: errorMsg}
        } else {
            const alreadyExist = this.cityData.find(c=> c.name == fetchedCityData.location.name)
            if(alreadyExist){
                return {error: 'This city is already in your list'}
            } else {
                this.cityData.unshift({
                    name: fetchedCityData.location.name,
                    updatedAt: fetchedCityData.current.last_updated,
                    temp: fetchedCityData.current.temp_c,
                    condition: fetchedCityData.current.condition.text,
                    conditionPic: fetchedCityData.current.condition.icon,
                    isSaved: false
                })
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
        const updatedCity = await apiManager.updateDisplayedCity(cityName)
        const relCityIndex = this.cityData.findIndex(c => c.name == updatedCity.name)
        this.cityData[relCityIndex] = updatedCity
        return this.cityData[relCityIndex]
    }
}