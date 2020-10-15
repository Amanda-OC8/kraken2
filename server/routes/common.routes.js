const express = require('express')
const router = express.Router()


const Character = require('../models/character.model')
const Folder = require('../models/folder.model')
const Archive = require('../models/archive.model')




// Endpoint Tree Component

router.get('/tree/:project_id', (req, res) => {

    
    const characterPromise = (Character.find({}, { name: 1, surname: 1, model: 1 }).populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }))
    const folderPromise = (Folder.find({}, { name: 1, model: 1 })
        .populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
        }).populate({
            path: "archives",
            select: "name parentFolder"
        })
    )

    const archivePromise = (Archive.find({}, {name: 1, model: 1}).populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }).populate({
        path: "parentFolder",
        select: "name"
    }))

   

    Promise.all([characterPromise, folderPromise, archivePromise])
        .then(response => {
            let filterResponse = response.map(elm => elm.filter(elm => elm.originProject != null))
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))

})

// //Endpoint wiki view

router.get('/wiki-elements/:project_id/', (req, res) => {

   
    const characterPromise = (Character.find({}, { name: 1, surname: 1, model: 1, isPublic: 1 }).populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }))
    const folderPromise = (Folder.find({}, { name: 1, model: 1, isPublic: 1 }).populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }))

    const archivePromise = (Archive.find({}, { name: 1, model: 1, isPublic: 1 }).populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }).populate({
        path: "parentFolder",
        select: "name"
    }))

    Promise.all([characterPromise, archivePromise, folderPromise])
        .then(response => {
            response.map(elm => console.log(elm.length))
            let filterResponse = response.map(elm => elm.filter(elm => elm.originProject != null && elm.isPublic == true))
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))

    

})




module.exports = router