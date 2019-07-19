class Renderer {
    constructor(){
        this.citiesBox = $('#cities')
    }
    

    renderData(allCities, city){
        this.citiesBox.empty()
        allCities.forEach(c=> this.useHandlebars('city-item', c, '#cities'))
        if(city){
            console.log(city.temp)
            const cityBox = $(`.city-name:contains(${city.name})`).closest('.single-city')
            this.renderBgcolor(city.temp)
            this.renderActiveCity(cityBox)
            this.renderDisplayedCity(city)
        }
    }

    renderDisplayedCity(city){
        // city.updatedAt = this.formatTime(city.updatedAt)
        $('#displayed-city').animate({opacity: 0}, 200).empty()
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

    renderBgcolor(temp){
        let rotateBy
        if(temp > 40){
            rotateBy = 0
        } else if (temp > 0) {
            rotateBy = 160 - (temp * 4)
        } else {
            rotateBy = 160
        }
        $('#main-display').css('filter', `hue-rotate(${rotateBy}deg)`)
    }

    renderError(error){
        $('#search-inp').attr('placeholder', error)
            .addClass('error')
    }

    formatTime(time){
        time = moment.utc(time).local()
        time = moment.utc(time)
        // .local().format('YYYY-MM-DD HH:mm:ss')
        time = moment(time).fromNow()
        return time
    }
    
    useHandlebars(templateName, data, appendTo){
        const src = $('#'+templateName+'-template').html()
        const template = Handlebars.compile(src)
        const newHtml = template(data)
        $(appendTo).append(newHtml)
    }
}