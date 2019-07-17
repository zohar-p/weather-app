class Logic {
    constructor(){
        this.cityData = []
    }

    getCities(){
        apiManager.fetchCities()
            .then(cities=> cities != [] ? this.cityData = [...cities] : null) // TODO: fail case for empty DB
    }

    getCityData(cityName){
        apiManager.fetchCityData(cityName)
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
}