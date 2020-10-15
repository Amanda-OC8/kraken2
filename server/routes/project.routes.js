const express = require('express')
const router = express.Router()


const Project = require('../models/project.model')
const Archive = require('../models/archive.model')
const Folder = require('../models/folder.model')
const Character = require('../models/character.model')



// Endpoint Public view projects

router.get('/all', (req, res) => {
    Project.find()
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

//Endpoints Project
router.get('/:project_id', (req, res) => {

    Project.findById(req.params.project_id)
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {

    Project.create(req.body)
        .then(response => {
            res.json(response)

            return Archive.create({ isStory: true, originProject: response._id, name: "Historia", description: "Aquí va tu historia", owner: req.user._id })

        })
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => res.status(500).json(err))

})

router.put('/:project_id/edit', (req, res) => {

    Project.findByIdAndUpdate(req.params.project_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:project_id/delete', (req, res) => {

    // const projectPromise = Project.findByIdAndDelete(req.params.folder_id)
    // const folderPromise = Folder.deleteMany({ originProject: { $in: req.params.folder_id } })
    // const characterPromise = Character.deleteMany({ originProject: { $in: req.params.folder_id } })
    // const archivePromise = Archive.deleteMany({ originProject: { $in: req.params.folder_id } })


    
    // Promise.all([projectPromise, folderPromise, characterPromise, archivePromise])
    Project.findByIdAndDelete(req.params.project_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))


})

// //Endpoints Timeline
// router.get('/timeline/:project_id', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { timeline: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/timeline/edit/:project_id', (req, res) => {

//     const timeline = req.body


//     Project.findByIdAndUpdate(req.params.project_id, { timeline })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.post('/timeline/new/:project_id', (req, res) => {

//     const projectId = req.params.project_id
//     const timeline = req.body


//     Project.findByIdAndUpdate(projectId, { timeline })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })



// //Endpoints Story
router.get('/story/:project_id', (req, res) => {

    Archive.find({ isStory: { $eq: true } }, { description: 1, name: 1 })
        .populate({
            path: "originProject",
            match: { _id: req.params.project_id },
            select: "title"
        })
        .populate("owner")
        .then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))

})

router.put('/story/:project_id/edit', (req, res) => {

    const { description } = req.body

    Archive.find({}, { description: 1, name: 1 })
        .populate({
            path: "originProject",
            match: { _id: req.params.project_id },
            select: "title"
        })
        .populate("owner")
        .then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)

            return Archive.findByIdAndUpdate(filterResponse[0]._id, { description })
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})





module.exports = router