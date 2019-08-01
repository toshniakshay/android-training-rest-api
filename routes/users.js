const express = require('express')

const router = express.Router()

const users = []
const standardResponse = require('../standard_response')


function createSuccessResponse(data) {
    standardResponse.success = true
    standardResponse.error = null
    standardResponse.data = data
    return standardResponse
}

function createFailureResponse(message) {
    standardResponse.success = false
    standardResponse.error = message
    standardResponse.data = null
    return standardResponse
}

router.get('', (req, res) => {
    res.status(200).send(users)
})

// lodash library : how to remove perticular property from object 
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if(!user) return res.status(404).send(createFailureResponse("No user found."))
    res.status(200).send(createSuccessResponse(user))
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
    res.status(201).send(createSuccessResponse(user))
})

router.put('/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id))

    if(!user) return res.status(404).send(createFailureResponse("No user found."))

    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.gender = req.body.gender
    user.country = req.body.country
    user.state = req.body.state
    user.email = req.body.email
    user.password = req.body.password

    res.status(200).send(createSuccessResponse(user))

})


router.post('/authenticate', (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password)
    if (!user) return res.status(404).send(createFailureResponse(`Cannot find user with id ${req.body.email}`))
    return res.status(200).send(createSuccessResponse(user))
})


router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if(!user) return res.status(400).send(createFailureResponse("User not found"))
    users.splice(user, 1)
    res.status(200).send(createSuccessResponse("User deleted sucessfully"))
})

module.exports = router