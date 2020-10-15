const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
    model: {
        type: String,
        default: "Folder"
    },
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    archives: [{
        type: Schema.Types.ObjectId,
        ref: "Archive",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Folder = mongoose.model('Folder', folderSchema)
module.exports = Folder