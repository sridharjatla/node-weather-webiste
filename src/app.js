const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

const publicPathDir = path.join(__dirname, '/../public')
const viewsPathDir = path.join(__dirname, './../templates/views')
const partialsPathDir = path.join(__dirname, '../templates/partials')

app.set('views', viewsPathDir)

app.use(express.static(publicPathDir))
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPathDir)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Sridhar Jatla'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Sridhar Jatla'
    })
})

app.get('/Help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sridhar Jatla'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'must provide an address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        })


    })


})


app.get('/climate', (req, res) => {
    if (!req.query.place) {
        return res.send({ error: 'must provide a place ' })
    }

    geocode(req.query.place, (error, { latitude, longitude, location }) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastdata,
                place: req.query.place
            })
        })


    })



})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help article not found '
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'sridhar'
    })
})



app.listen(port, () => {
    console.log('running ... on port' + port)
})
