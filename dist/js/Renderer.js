class Renderer {
    constructor(){
        this.citiesBox = $('#cities')
    }
    

    renderData(allCities){
        this.citiesBox.empty()
        allCities.forEach(c=> this.useHandlebars('city-item', c, '#cities'))
    }

    async renderDisplayedCity(city){
        await $('#displayed-city').animate({opacity: 0}, 200).empty()
        this.useHandlebars('displayed-city', city, '#displayed-city')
        $('#displayed-city').animate({opacity: 1}, 200)
    }

    renderActiveCity(city){
        $('.single-city').removeClass('active')
        $('.hr').show()
        city.addClass('active')
        city.prev('.hr').hide()
        city.next('.hr').hide()
    }

    renderError(error){
        $('#search-inp').attr('placeholder', error)
            .addClass('error')
        console.log(error)
    }
    
    useHandlebars(templateName, data, appendTo){
        const src = $('#'+templateName+'-template').html()
        const template = Handlebars.compile(src)
        const newHtml = template(data)
        $(appendTo).append(newHtml)
    }
}