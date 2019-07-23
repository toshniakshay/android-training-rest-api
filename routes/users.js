const express = require('express')

const router = express.Router()

const users = []

router.get('', (req, res) => {
    res.status(200).send(users)
})

// lodash library : how to remove perticular property from object 
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))

    if(!user) return res.status(404).send("No user found.")

    res.status(200).send(user)
})

router.post('', (req, res) => {
    const user = {
        id : users.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        gender : req.body.gender,
        country : req.body.country,
        state : req.body.state,
        email : req.body.email,
        password : req.body.password
    }

    users.push(user)

    res.status(201).send(user)
})

router.put('/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id))

    if(!user) return res.status(404).send("No user found.")

    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.gender = req.body.gender
    user.country = req.body.country
    user.state = req.body.state
    user.email = req.body.email
    user.password = req.body.password

    res.status(200).send(user)

})

// slice vs splice
router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))

    if(!user) return res.status(400).send("User not found")

    users.splice(user, 1)

    res.status(200).send("User deleted sucessfully")
})

module.exports = router