const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config 
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup hbs engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather',
       name: 'Erin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About',
       name: 'Erin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'This is the help message',
       title: 'Help',
       name: 'Erin'
    })
})

app.get('/weather', (req, res) => {  
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }
        geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
            if (error) {
                return res.send({ error})
            }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
             res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
            
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        pageNotFound: 'Help Article Not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        pageNotFound: 'Page Not Found'
    })
})



//start the server - this is a dev port - for http website it's port 80 - urlis localhost:3000

app.listen(3000, () => {
    console.log('server started')
})