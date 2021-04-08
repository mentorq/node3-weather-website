const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const express = require('express')
const { response } = require('express')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars, engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Andrew'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is my help message',
        name: 'Andrew'
    })
})



app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address property not provided!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        // console.log('GEOCODE VALUE SENT: ' + req.query.address + " + LAT: " + latitude + " LONG: " + longitude)
        forecast(latitude,longitude, (error, forecastData) => {
            console.log(forecastData)
            if (error) {
                console.log(error)
                return res.send ({ error })
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        })
    })



app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Article not found',
        errorMessage: 'This article does not exists',
        name: 'Andrew'
    })
})
 
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Andrew',
        errorMessage: 'This page does not exists'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})