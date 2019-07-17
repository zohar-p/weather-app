class Renderer {
    

    renderData(allCities){
        allCities.forEach(c=> this.useHandlebars('city', c, '#cities'))
    }
    
    useHandlebars(templateName, data, appendTo){
        const src = $('#'+templateName+'-template').html()
        const template = Handlebars.compile(src)
        const newHtml = template(data)
        $(appendTo).append(newHtml)
    }
}