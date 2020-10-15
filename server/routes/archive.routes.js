const express = require('express')
const router = express.Router()


const Archive = require('../models/archive.model')
const Folder = require('../models/folder.model')




//Endpoints Archive
router.get('/all/project/:project_id/:folder_id', (req, res) => {

    Archive.find(req.params.archive_id)
        .populate({
            path: "originProject", 
            match: { _id: req.params.project_id },
            select: "title"
        })
        .populate("owner")
        .populate({
            path: "parentFolder",
            match: { _id: req.params.folder_id },
            select: "name "
        })
        .then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null && elm.parentFolder != null)
            res.json(filterResponse)
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/:archive_id/project/:project_id/:folder_id', (req, res) => {

    Archive.findById(req.params.archive_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new/project/:project_id/:folder_id/', (req, res) => {

    const { name, relatedArchives, description,  isPublic } = req.body
 
    Archive.create({ name, relatedArchives, description, originProject: req.params.project_id, parentFolder: req.params.folder_id, owner: req.user._id, isPublic })
        .then(response => {
            res.json(response)
            return Folder.findByIdAndUpdate(req.params.folder_id, { $push: { archives: response._id } })
        })
        .then(()=> console.log("add"))
        .catch(err => res.status(500).json(err))
    
     
})

router.put('/:archive_id/edit/project/:project_id/:folder_id', (req, res) => {

    const { name, relatedArchives, description, isPublic } = req.body
   
    Archive.findByIdAndUpdate(req.params.archive_id, { name, relatedArchives, description, originProject: req.params.project_id, originFolder: req.params.folder_id, owner: req.user._id, isPublic })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:archive_id/delete/project/:project_id/:folder_id', (req, res) => {

    Archive.findByIdAndDelete(req.params.archive_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router