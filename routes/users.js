const express = require('express')

const router = express.Router()

const users = []

router.get('', (req, res) => {
    res.send("Api call successful")
})

router.post('', (req, res) => {

})

router.put('', (req, res) => {

})

router.delete('', (req, res) => {

})

module.exports = router