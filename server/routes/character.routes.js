const express = require('express')
const router = express.Router()

const Project = require('../models/project.model')
const Character = require('../models/character.model')



//Endpoints Character

router.get('/allcharacters/project/:project_id/', (req, res) => {

    Character.find()
        .populate({
            path: "originProject",
            match: { _id: req.params.project_id },
            select: "title genre"
        })
        .populate("owner")
        .then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/:character_id/project/:project_id/', (req, res) => {

    Character.findById(req.params.character_id)
        .populate("originProject")
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new/project/:project_id/', (req, res) => {

    const { name, surname, genre, age, background, rolHistory, occupation, physicalDescription, personality, habits, notes, isPublic } = req.body

    Character.create({ originProject: req.params.project_id, name, surname, genre, age, background, rolHistory, occupation, physicalDescription, personality, habits, notes, owner: req.user._id, isPublic, OriginProject: req.params.project_id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/:character_id/edit/project/:project_id/', (req, res) => {
    const { name, surname, genre, age, background, rolHistory, occupation, physicalDescription, personality, habits, notes, isPublic } = req.body

    Character.findByIdAndUpdate(req.params.character_id, { name, surname, genre, age, background, rolHistory, occupation, physicalDescription, personality, habits, notes, owner: req.user._id, isPublic, OriginProject: req.params.project_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.delete('/:character_id/delete/project/:project_id/', (req, res) => {

    const projectPromise = Project.findById(req.params.project_id)
    const characterPromise = Character.findByIdAndDelete(req.params.character_id)

    Promise.all([projectPromise, characterPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router