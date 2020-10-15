const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Project = require('../models/project.model')
const Character = require('../models/character.model')
const Folder = require('../models/folder.model')
const Archive = require('../models/archive.model')

//Endpoints User
router.get('/profile', (req, res) => {

    const userPromise = User.findById(req.user._id)


    const projectPromise = Project.find({ "owner": { $in: [req.user._id] } }, { username: 1, bio: 1, image: 1, favProjects: 1 })

    Promise.all([projectPromise, userPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/profile/edit', (req, res) => {

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

//Endpoints Project
router.get('/project/:project_id', (req, res) => {
    
    Project.findById(req.params.project_id)
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/project/new', (req, res) => {

    Project.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/project/:project_id/edit', (req, res) => {

    Project.findByIdAndUpdate(req.params.project_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/project/:project_id/delete', (req, res) => {

    Project.findByIdAndDelete(req.params.project_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

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

router.post('/character/new/project/:project_id/', (req, res) => {

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

//Endpoints Folder
router.get('/allfolders/:project_id', (req, res) => {
    
    Folder.find()
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

router.get('/folder/:folder_id/project/:project_id/', (req, res) => {
   
    Folder.findById(req.params.folder_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:folder_id/edit/project/:project_id/', (req, res) => {

        const { name, isPublic } = req.body

        Folder.findByIdAndUpdate(req.params.folder_id, { name, isPublic})
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))

})

router.post('/folder/new/project/:project_id', (req, res) => {

    const projectId = req.params.project_id

    const { name, isPublic } = req.body

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.create({ name, isPublic, OriginProject: projectId, owner: req.user._id })

    Promise.all([projectPromise, folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:folder_id/delete/project/:project_id', (req, res) => {

    Folder.findByIdAndDelete(req.params.folder_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// //Endpoints Archive
// router.get('/:archive_id/project/:project_id/:folder_id', (req, res) => {

//     Archive.findById(archiveId)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

// router.get('/allarchives/project/:project_id/:folder_id', (req, res) => {

//     Archive.find(archiveId)
//         .populate("originProject")
//         .populate("owner")
//         .populate({
//             path: parentFolder,
//             match: { _id: req.params.folder_id }
//         })
//         .then(response => {
//             let filterResponse = response.filter(elm => elm.originProject != null)
//             res.json(filterResponse)
//         })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

// router.post('/archive/new/project/:project_id/:folder_id/', (req, res) => {


//     // const { name, description, relatedArchive } = req.body
//     const { originProject, originFolder, name, relatedArchive, description,  owner, isPublic} = req.body

//     // Archive.create({ name, description, originProject: req.params.project_id, originFolder: req.params.folder_id, owner: req.user._id })
//     Archive.create({ originProject, originFolder, name, relatedArchive, description, owner, isPublic })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

// router.put('/:archive_id/edit/project/:project_id/:folder_id', (req, res) => {

//     const { name, description } = req.body

//     Archive.findByIdAndUpdate(req.params.archive_id, { name, description, originProject: req.params.project_id, originFolder: req.params.folder_id, owner: req.user._id })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

// router.delete('/:archive_id/edit/project/:project_id/:folder_id', (req, res) => {

//     Archive.findByIdAndDelete(archiveId)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })

// //Endpoints Timeline
// router.get('/project/:project_id/timeline', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { timeline: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/project/:project_id/timeline', (req, res) => {

//     const projectId = req.params.project_id
//     const timeline = req.body


//     Project.findByIdAndUpdate(projectId, { timeline })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// //Endpoints Glossary
// router.get('/project/:project_id/glossary', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { glossary: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/project/:project_id/glossary', (req, res) => {

//     const projectId = req.params.project_id
//     const glossary = req.body


//     Project.findByIdAndUpdate(projectId, { glossary })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// //Endpoints Story
// router.get('/project/:project_id/Story', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { story: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/project/:project_id/Story', (req, res) => {

//     const projectId = req.params.project_id
//     const story = req.body


//     Project.findByIdAndUpdate(projectId, { story })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })


// //Endpoint wiki view

// router.get('/project/:project_id/wiki-elements', (req, res) => {

//     const projectId = req.params.project_id

//     const projectPromise = Project.findById(projectId)
//     const characterPromise = Character.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })
//     const archivePromise = Archive.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })

//     Promise.all([projectPromise, characterPromise, archivePromise])
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// Endpoint Public view projects

router.get('/all-projects', (req, res) => {


    Project.find()
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// router.get('/all-projects/results', (req, res) => {

// const queryResults = req.query.results

// Project.find({querys result})
//     .then(response => res.json(response))
//     .catch(err => res.status(500).json(err))
// })


module.exports = router