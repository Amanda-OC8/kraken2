const express = require('express')
const router = express.Router()


const User = require('../models/user.model')
const Project = require('../models/project.model')


//Endpoints User
router.get('/', (req, res) => {

    const userPromise = User.findById(req.user._id)


    const projectPromise = Project.find({ "owner": { $in: [req.user._id] } }, { username: 1, bio: 1, image: 1, favProjects: 1 })

    Promise.all([projectPromise, userPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit', (req, res) => {

    const { username, email, bio, image } = req.body


    User.findByIdAndUpdate(req.user._id, { username, email, bio, image })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/own-projects', (req, res) => {

    Project.find()
        .populate({
            path: "owner",
            match: { _id: req.user._id }
        })
        .then(response => {
            let filterResponse = response.filter(elm => elm.owner != null)
            res.json(filterResponse)
        })
})



module.exports = router