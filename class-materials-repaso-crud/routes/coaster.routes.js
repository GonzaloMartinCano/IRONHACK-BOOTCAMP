const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

// Aquí los endpoints

router.get('/', (req, res) => {
    
    Coaster.find()
        .then((coasters) => res.render('coasters/coasters-index', {coasters}))
        .catch((err) => console.log(err))
})


router.get('/coaster-details/:id', (req, res) => {

    // Coaster.findById(req.params.id)
    //     .then((response) => res.render('coasters/coaster-details', response))
    //     .catch((err) => console.log(err))

    Coaster.findById(req.params.id)
        .then((coaster) => {
            Park.findById(coaster.park)
                .then((park) => res.render('coasters/coaster-details', { coaster, park }))
                .catch(err => console.log(err))
            })
    .catch((err) => console.log(err))
})


router.get('/new-coaster', (req, res) => {
    
    Park.find()
        .then( (parks) => res.render('coasters/new-coaster', {parks}))
        .catch(err => console.log(err))
})

router.post('/new-coaster', (req, res) => {

    const { name, description, inversions, park } = req.body
    // console.log({ name, description, inversions, park })
    Coaster.create({ name, description, inversions, park })
        .then( () => res.redirect('new-coaster'))
        .catch(err => console.log(err))
})

router.get('/delete?', (req, res) => {
    Coaster.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})

router.get('/edit?', (req, res) => {
    Coaster.findById(req.query.id)
        .then((coaster) => {
            Park.find()
                .then((parks) => res.render('coasters/coaster-edit', { coaster, parks }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/edit?', (req, res) => {
    
    const { name, description, inversions, park } = req.body
    Coaster.findByIdAndUpdate(req.query.id, { name, description, inversions, park })
        .then( () => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


module.exports = router