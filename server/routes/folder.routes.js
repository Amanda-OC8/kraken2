const express = require('express')
const router = express.Router()




const Folder = require('../models/folder.model')
const Archive = require('../models/archive.model')


//Endpoints Folder
router.get('/allfolders/project/:project_id', (req, res) => {
    
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

router.get('/:folder_id/project/:project_id/', (req, res) => {
   
    Folder.findById(req.params.folder_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new/project/:project_id', (req, res) => {

    

    const { name, isPublic, owner, originProject } = req.body
    console.log({ name, isPublic, owner, originProject })
 
   Folder.create({ name, isPublic, owner, originProject})   
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:folder_id/edit/project/:project_id/', (req, res) => {

        const { name, isPublic, archives } = req.body

        Folder.findByIdAndUpdate(req.params.folder_id, { name, isPublic, archives})
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))

})

router.delete('/:folder_id/delete/project/:project_id', (req, res) => {

    const folderPromise = Folder.findByIdAndDelete(req.params.folder_id)
    const archivePromise = Archive.deleteMany({ parentFolder: { $in: req.params.folder_id } })
   
    Promise.all([folderPromise, archivePromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})


module.exports = router