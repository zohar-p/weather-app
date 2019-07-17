class Renderer {
    

    renderData(allCities){
        this.useHandlebars('city', allCities, '#cities')
    }
    
    useHandlebars(templateName, data, appendTo){
        const src = $('#'+templateName+'-template').html()
        const template = Handlebars.compile(src)
        const newHtml = template(data)
        $(appendTo).append(newHtml)
    }
}