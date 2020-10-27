const express = require('express')
const { route } = require('./coaster.routes')
const router = express.Router()

const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/new-park', (req, res) => res.render('parks/new-park'))

router.post('/new-park', (req, res) => {
    const { name, description } = req.body

    Park.create({ name, description })
        .then(() => res.redirect('new-park'))  
        .catch((err) => console.log(err))

})


module.exports = router