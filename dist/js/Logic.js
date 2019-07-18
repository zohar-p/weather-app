class Logic {
    constructor(){
        this.cityData = []
    }
    // TODO: add fail cases for all
    async getCities(){
        const cities = await apiManager.fetchCities()
        cities.length ? this.cityData = [...cities] : null // failcase
    }

    getCityData(cityName){
        return apiManager.fetchCityData(cityName)
            .then(data=>{
                this.cityData.push({
                    name: data.location.name,
                    updatedAt: data.current.last_updated,
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    conditionPic: data.current.condition.icon,
                    isSaved: false
                })
            }).catch(err => {

            })
    }

    saveCity(cityName){
        const cityInfo = this.cityData.find(c=> c.name == cityName)
        cityInfo.isSaved = true
        return cityInfo ? apiManager.createCity(cityInfo) : false
    }

    removeCity(cityName){
        return apiManager.deleteCity(cityName)
    }
}





// changes