class Renderer {
    constructor(){
        this.citiesBox = $('#cities')
    }
    

    renderData(allCities){
        this.citiesBox.empty()
        allCities.forEach(c=> this.useHandlebars('city-item', c, '#cities'))
    }

    renderDisplayedCity(city){
        $('#displayed-city').empty()
        this.useHandlebars('displayed-city', city, '#displayed-city')
    }
    
    useHandlebars(templateName, data, appendTo){
        const src = $('#'+templateName+'-template').html()
        const template = Handlebars.compile(src)
        const newHtml = template(data)
        $(appendTo).append(newHtml)
    }
}